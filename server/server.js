'use strict';

const restify = require('restify');

function Server(skyfall) {
  const self = this;

  self.clients = {};

  //////////

  skyfall.api = restify.createServer({
    name: 'Skyfall',
    ignoreTrailingSlash: true,
    strictNext: true
  });

  skyfall.api.use(restify.pre.sanitizePath());
  skyfall.api.pre(restify.plugins.pre.dedupeSlashes());
  skyfall.api.use(restify.plugins.dateParser());
  skyfall.api.use(restify.plugins.queryParser());
  skyfall.api.use(restify.plugins.bodyParser());
  skyfall.api.use(restify.plugins.authorizationParser());

  skyfall.api.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');

    res.header('skyfall-server-version', skyfall.version);

    next();
  });

  //////////

  skyfall.api.get('/api/version', function(req, res, next) {
    const version = {
      name: 'skyfall-server',
      version: skyfall.version
    };
    res.send(200, version);
    next();
  });

  /////////

  self.boot = function(callback) {
    callback = skyfall.util.callback(callback);

    if (!skyfall.config.api.enabled) {
      return callback();
    }

    skyfall.api.listen(skyfall.config.api.port, skyfall.config.api.host, function(error) {
      if (error) {
        return callback(error);
      } else {
        console.log(`Skyfall Server running on http://${ skyfall.config.api.host}:${ skyfall.config.api.port }`);
        callback();
      }
    });
  };

  self.stop = function(callback) {
    callback = skyfall.util.callback(callback);

    skyfall.api.close(callback);
  };

  return this;
}

module.exports = function(skyfall) {
  return new Server(skyfall);
};
