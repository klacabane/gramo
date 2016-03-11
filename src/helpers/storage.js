'use strict';

const AWS = require('aws-sdk');
AWS.config.credentials = {
  accessKeyId: process.env.AWSAccessKey,
  secretAccessKey: process.env.AWSSecretKey,
};
AWS.config.region = 'eu-central-1';

const s3 = new AWS.S3({params: {Bucket: process.env.GRAMO_BUCKET}});

module.exports = {
  /**
   * @param {Object}
   *  key   {string}
   *  body  {ReadableStream}
   * @returns {Promise<string>}
   */
  upload(opts) {
    console.log('Uploading', opts.key);

    return new Promise((resolve, reject) => {
      const params = {
        ACL: 'public-read',
        Body: opts.body,
        Key: opts.key,
      };

      s3.upload(
        params,
        (err, data) => {
          if (err) return reject(err);
          console.log('Uploaded', opts.key);
          resolve(data.Location);
        }
      );
    });
  },
};
