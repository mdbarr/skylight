'use strict';

const uuid = require('uuid/v4');
const crypto = require('crypto');
const barrkeep = require('barrkeep');

function Util() {
  const self = this;

  self.id = () => uuid();

  self.noop = () => undefined;
  self.camelize = barrkeep.camelize;
  self.clone = barrkeep.deepClone;
  self.merge = barrkeep.merge;

  self.addPrivate = function(object, name, value) {
    return Object.defineProperty(object, name, {
      value,
      enumerable: false
    });
  };

  self.callback = function(callback) {
    if (callback) {
      return function(error, data) {
        setImmediate(function() {
          callback(error, data);
        });
      };
    } else {
      return self.noop;
    }
  };

  self.computeHash = function(input, hash = 'sha1') {
    if (typeof input !== 'string') {
      input = JSON.stringify(input);
    }
    return crypto.createHash(hash).update(input).digest('hex');
  };

  self.sha256 = function(input) {
    return self.computeHash(input, 'sha256');
  };

  self.timestamp = function(date) {
    if (date) {
      return new Date(date).getTime();
    } else {
      return Date.now();
    }
  };

  return self;
}

module.exports = function(athena) {
  return new Util(athena);
};
