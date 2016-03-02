'use strict';

const fs = require('fs');
const path = require('path');
const unzip = require('unzip');
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');

const getUri = endpoint => `${process.env.MIXTAPES_URI}${endpoint}`;

const download = (uri) => {
  return new Promise((resolve, reject) => {
    request({
      uri,
      encoding: null,
      headers: { 'User-Agent': '' },
    })
    .pipe(unzip.Parse())
    .on('entry', (entry) => {
      if (entry.type === 'File' && 
          (path.extname(entry.path) === '.mp3' || entry.path === 'Cover.jpg')) {
        // - upload to s3
        // - save to db
      } else {
        // entry.autodrain();
      }
      console.log(entry.path);
      entry.autodrain();
    })
    .on('close', resolve)
    .on('error', reject);
  });
};

module.exports = {
  download(uri) {
    const scrap = $ => {
      const reMixtapeId = /TOOLS.download\('mixtape','([0-9]+)','','([0-9]+)','([a-z0-9]+)'\);/;

      const val = $('.mixtape-userFunctions-download').attr('onclick');
      const match = val.match(reMixtapeId);
      return getUri(`/download/mixtape/${match[1]}/${match[2]}?token=${match[3]}`);
    };

    return rp({
      uri,
      transform: cheerio.load,
    })
    .then(scrap)
    .then(download);
  },

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
            items.push({
              title: details[0],
              artist: details[1],
              link: getUri($item.attr('href')),
            });
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
