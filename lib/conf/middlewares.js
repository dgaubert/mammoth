var express = require('express');
var path = require('path');
var guard = require('../middlewares/guard')();
var errorReporter = require('../middlewares/error-reporter')();

var setup = function (app) {
  // common middlewares
  app.use(express.bodyParser());
  app.use(express.cookieParser('secreto'));
  app.use(express.session());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, '/../../public')));
};

var guard = function (app) {
  // restrict private area middleware
  app.use(guard.secure);
};

var error = function (app) {
  // error middleware
  app.use(errorReporter.notFound);
  app.use(errorReporter.serverError);
};

module.exports.setup = setup;
module.exports.guard = guard;
module.exports.error = error;
