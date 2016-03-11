'use strict';

const fs = require('fs');
const path = require('path');
const unzip = require('unzip');
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');

const storage = require('./storage.js');
const db = require('./db.js');
const Item = require('../item.js');
const Queue = require('../queue.js');

const getUri = endpoint => `${process.env.MIXTAPES_URI}${endpoint}`;

const queue = new Queue(1);

/**
 * @param {string}
 * @returns {Promise}
 */
const unlink = (localpath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(localpath, (err) => {
      if (err) return reject(err);

      // Check the content of the mixtape dir and remove
      // it if it's empty.
      const dir = path.dirname(localpath);
      fs.readdir(dir, (err, files) => {
        if (err) return reject(err);
        if (files.length) return resolve();

        fs.rmdir(dir, (err) => err ? reject(err) : resolve());
      });
    });
  });
};

const upload = (item) => () => {
  return storage.upload({
    body: fs.createReadStream(item.uri),
    key: item.uri,
  })
  .then(uri => {
    const localpath = item.uri;
    return db.updateItem(
      item.objectId(), 
      { uri, uploaded: true }
    ).then(() => unlink(localpath));
  });
};

/**
 * Downloads a mixtape and unzips it under 
 * ./music/${mixtape.title} local directory.
 * @param {Item}
 * @param {string}
 * @returns {Promise<Item>}
 */
const downloadToLocal = (mixtape, dlUri) => {
  const dirpath = path.join('./music', mixtape.title);

  /**
   * Pipes the stream to a local file and 
   * inserts the item in the database.
   * @param {ReadableStream}
   * @returns {Promise<Item>}
   */
  const save = (file) => {
    const ext = path.extname(file.path);
    const track = new Item({ 
      type: ext === '.mp3' ? 'track' : 'cover',
      uploaded: false,
      uri: path.join(dirpath, file.path),
      artist: mixtape.artist,
      title: path.basename(file.path, ext).trim(),
    });
    
    return new Promise((resolve, reject) => {
      file.pipe(fs.createWriteStream(track.uri))
        .on('close', () => {
          db.insertItem(track.toDbFmt())
            .then(item => {
              queue.push(
                upload(item)
              );

              resolve(item);
            });
        })
        .on('error', reject);
    });
  };

  return new Promise((resolve, reject) => {
    fs.mkdir(dirpath, (err) => {
      if (err) return reject(err);

      const promises = [];

      request({
        uri: dlUri,
        encoding: null,
        headers: { 'User-Agent': '' },
      })
      .pipe(unzip.Parse())
      .on('entry', (entry) => {
        if (entry.type === 'File' && 
          (path.extname(entry.path) === '.mp3' || entry.path === 'Cover.jpg')) {

          promises.push(save(entry));
        } else {
          entry.autodrain();
        }
      })
      .on('close', () => {
        Promise.all(promises)
          .then(items => {
            const tracks = items.filter(item => item.type === 'track');
            const update = { tracks: tracks.map(track => track.objectId()) };
            return db.updateItem(mixtape.objectId(), update);
          })
          .then(resolve)
          .catch(reject);
      })
      .on('error', reject);
    });
  });
};

module.exports = {
  /**
   * @param {Item}
   * @returns {Promise<Item>}
   */
  download(mixtape) {
    const scrap = $ => {
      const reMixtapeId = /TOOLS.download\('mixtape','([0-9]+)','','([0-9]+)','([a-z0-9]+)'\);/;

      const val = $('.mixtape-userFunctions-download').attr('onclick');
      const match = val.match(reMixtapeId);
      return getUri(`/download/mixtape/${match[1]}/${match[2]}?token=${match[3]}`);
    };

    return rp({
      uri: mixtape.uri,
      transform: cheerio.load,
    })
    .then(scrap)
    .then(dlUri => downloadToLocal(mixtape, dlUri));
  },

  /**
   * @param {string}
   * @returns {Promise<[]Item>}
   */
  search(term) {
    const scrap = $ => {
      const items = [];

      $('.search-resultsList > article')
        .each((_, elem) => {
          const $item = $(elem).find('.panel-body-title');
          const details = $item
            .text()
            .replace(/\n|\s/g, '')
            .split('-');

          if (details.length > 1) {
            const item = new Item({
              title: details[0],
              artist: details[1],
              uri: getUri($item.attr('href')),
            });
            items.push(item);
          }
        });
      return items;
    };

    return rp({
      uri: getUri(`/search/${term}/mixtapes/popular/`),
      transform: cheerio.load,
    })
    .then(scrap);
  },
};
