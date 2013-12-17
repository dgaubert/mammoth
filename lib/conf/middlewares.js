var express = require('express');
var path = require('path');
var guardMiddleware = require('../middlewares/guard')();
var errorMiddleware = require('../middlewares/error')();

var setup = function setup(app) {
  // common middlewares
  app.use(express.bodyParser());
  app.use(express.cookieParser('secreto'));
  app.use(express.session());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, '/../../public')));
};

var guard = function guard(app) {
  // restrict private area middleware
  app.use(guardMiddleware.secure);
};

var error = function error(app) {
  // handle 404 & 500
  app.use(errorMiddleware.notFound);
  app.use(errorMiddleware.serverError);
};

module.exports.setup = setup;
module.exports.guard = guard;
module.exports.error = error;
