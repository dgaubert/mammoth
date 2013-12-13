var express = require('express'),
    path = require('path'),
    guard = require('../middlewares/guard')(),
    errorReporter = require('../middlewares/error-reporter')();

module.exports.setup = function (app) {
  // common middlewares
  app.use(express.bodyParser());
  app.use(express.cookieParser('secreto'));
  app.use(express.session());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, '/../../public')));
};

module.exports.guard = function (app) {
  // restrict private area middleware
  app.use(guard.secure);
};

module.exports.error = function (app) {
  // error middleware
  app.use(errorReporter.notFound);
  app.use(errorReporter.serverError);
};
