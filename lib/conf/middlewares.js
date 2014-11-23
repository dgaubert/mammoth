'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var path = require('path');

var GuardMiddleware = require('../middlewares/guard');
var ErrorMiddleware = require('../middlewares/error');

var errorMiddleware = new ErrorMiddleware();
var guardMiddleware = new GuardMiddleware();

function setup(app) {

  // common middlewares
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser('secreto'));
  app.use(session({ secret: 'secreto' }));
  app.use(methodOverride('_method'));
  app.use(express.static(path.join(__dirname, '/../../public')));
}

function checkDatabaseConnection(app) {
  app.use(function(req, res, next) {
    if(!mongoose.connection.readyState) {
      return next(new Error('DB connection is not ready'));
    }

    return next();
  });
}

function guard(app) {
  // restrict private area middleware
  app.use(guardMiddleware.secure.bind(guardMiddleware));
}

function error(app) {
  // handle 404 & 500
  app.use(errorMiddleware.notFound.bind(errorMiddleware));
  app.use(errorMiddleware.serverError.bind(errorMiddleware));
}

module.exports.setup = setup;
module.exports.guard = guard;
module.exports.checkDB = checkDatabaseConnection;
module.exports.error = error;
