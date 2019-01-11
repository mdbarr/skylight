'use strict';

require('barrkeep');

const defaults = {
  object: 'config',
  api: {
    enabled: true,
    host: '0.0.0.0',
    port: 7580,
    available: true
  },
  datastore: 'mongo',
  mongo: {
    url: process.env.SKYFALL_MONGO_URL ||
      'mongodb://localhost:27017',
    db: process.env.SKYFALL_MONGO_DB ||
      'veodb'
  },
  log: {
    enabled: false,
    console: false,
    file: 'skyfall.log'
  }
};

function Skyfall(config = {}) {
  const self = this;

  //////////

  self.project = require('../package');
  self.version = self.project.version;
  self.constants = require('../common/constants');

  //////////

  self.config = Object.merge(defaults, config);

  //////////

  self.util = require('./util')(self);

  self.store = require('./datastore')(self);

  self.server = require('./server')(self);

  //////////

  self.boot = function(callback) {
    callback = self.util.callback(callback);

    console.log(self.constants.assets.bannerAnsi.
      style(self.constants.style.green));

    self.store.boot(function() {
      self.server.boot(function() {
        callback();
      });
    });
  };

  self.stop = function(callback) {
    callback = self.util.callback(callback);

    self.store.stop(function() {
      self.server.stop(function() {
        callback();
      });
    });
  };

  //////////

  return self;
}

module.exports = Skyfall;
