'use strict';

const Item = require('../item.js');

const Db = {
  init(db) {
    this._db = db;
  },

  collection(name) {
    return Db._db.collection(name);
  },

  getMixtapes(filters) {
    return Db.collection('items')
      .find()
      .toArray();
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

