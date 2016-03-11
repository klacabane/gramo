'use strict';

const { ObjectId } = require('mongodb');

class Item {
  constructor(opts = {}) {
    this.id = opts._id ? opts._id.toHexString() : '';
    this.type = opts.type || 'track';
    this.artist = opts.artist || '';
    this.title = opts.title || '';
    this.uri = opts.uri || '';
    this.tracks = opts.tracks || [];
    this.uploaded = opts.uploaded || false;
  }

  toDbFmt() {
    const ret = {
      type: this.type,
      artist: this.artist,
      title: this.title,
      uri: this.uri,
      uploaded: this.uploaded,
    };
    if (this.type === 'mixtape') {
      ret.tracks = this.tracks.map(track => track.objectId());
    }
    return ret;
  }

  objectId() {
    return new ObjectId(this.id);
  }
}

module.exports = Item;
