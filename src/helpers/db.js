'use strict';

const Item = require('../item.js');

/**
 * @param {Object}
 * @return {Promise<Item>}
 */
const populateMixtape = (doc) => {
  return Db.collection('items')
    .find({ _id: { $in: doc.tracks } })
    .toArray()
    .then(tracks => {
      const opts = Object.assign({}, doc, {
        tracks: tracks.map(track => new Item(track)),
      });
      return new Item(opts);
    });
};

const Db = {
  init(db) {
    this._db = db;
  },

  collection(name) {
    return Db._db.collection(name);
  },

  getMixtapes(filters) {
    return Db.collection('items')
      .find({ type: 'mixtape' })
      .toArray()
      .then(docs => {
        return Promise.all(
          docs.map(populateMixtape)
        );
      });
  },

  insertItem(item) {
    return Db.collection('items')
      .insertOne(item)
      .then(res => new Item(res.ops[0]));
  },

  updateItem(id, update) {
    return Db.collection('items')
      .findOneAndUpdate(
        { _id: id },
        { $set: update },
        { returnOriginal: false }
      )
      .then(res => new Item(res.value));
  },
};

module.exports = Db;

