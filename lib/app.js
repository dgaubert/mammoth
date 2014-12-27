'use strict';

var di = require('di');
var Module = require('./di/module.js');
var config = require('config');
var logger = require('./logger');
var express = require('express');
var settings = require('./conf/settings');
var db = require('./db');
var middlewares = require('./conf/middlewares');
var server;

var injector = new di.Injector(Module);

var router = injector.get(express.Router);

var application = {
  start: function start() {
    if (server) {
      return server;
    }

    var app = express();

    db.connect();

    settings.init(app); // initialize conf
    middlewares.setup(app); // common middleware
    middlewares.guard(app); // restrict private area middleware
    app.use(router);
    middlewares.error(app);// error reporter

    server = app.listen(config.server.port);
    logger.info('Service ' + config.server.name + ' started on port', config.server.port);

    process.on('SIGINT', this.exit);
    process.on('SIGTERM', this.exit);

    return server;
  },
  exit: function exit() {
    logger.warn('SIGTERM or SIGINT received, stopping..');
    db.close(function () {
      server.close(function () {
        logger.warn('Server closed, quit..');
        process.exit(0);
      });
    });
  }
};

module.exports = application;
