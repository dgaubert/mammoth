/* jslint node: true */
'use strict';

var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var guardMiddleware = require('../middlewares/guard')();
var errorMiddleware = require('../middlewares/error')();

function setup(app) {

  // common middlewares
  app.use(express.bodyParser());
  app.use(express.cookieParser('secreto'));
  app.use(express.session());
  app.use(express.methodOverride());
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
  app.use(guardMiddleware.secure);
}

function error(app) {
  // handle 404 & 500
  app.use(errorMiddleware.notFound);
  app.use(errorMiddleware.serverError);
}

module.exports.setup = setup;
module.exports.guard = guard;
module.exports.checkDB = checkDatabaseConnection;
module.exports.error = error;
