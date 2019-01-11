'use strict';

const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

function DataStore(skyfall) {
  const self = this;

  self.boot = function(callback) {
    callback = skyfall.util.callback(callback);

    self.client = new MongoClient(skyfall.config.mongo.url, {
      useNewUrlParser: true
    });

    self.client.connect(function(error) {
      assert.equal(null, error);

      self.db = self.client.db(skyfall.config.mongo.db);
      self.collections = {
        pulls: self.db.collection('pulls'),
        users: self.db.collection('users')
      };

      callback();
    });
  };

  self.stop = function(callback) {
    callback = skyfall.util.callback(callback);

    self.client.close(function() {
      callback();
    });
  };

  return self;
}

module.exports = function(skyfall) {
  return new DataStore(skyfall);
};
