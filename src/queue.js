'use strict';

class Queue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    this._queue = [];
    this._pending = 0;
  }

  _exec(job) {
    this._pending++;

    job().then(() => {
      this._pending--;
      if (this._queue.length) {
        this._exec(this._queue.shift());
      }
    })
    .catch(err => {
      this._pending--;
      console.log('Error processing job', err);
    });
  }

  push(job) {
    if (this._pending === this.concurrency) {
      this._queue.push(job);
      return;
    }
    this._exec(job);
  }
};

module.exports = Queue;
