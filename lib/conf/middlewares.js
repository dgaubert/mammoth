'use strict';

var config = require('config');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var session = require('express-session');
var methodOverride = require('method-override');
var path = require('path');

var GuardMiddleware = require('../middlewares/guard');
var ErrorMiddleware = require('../middlewares/error');

var errorMiddleware = new ErrorMiddleware();
var guardMiddleware = new GuardMiddleware();

function setup(app) {

  // common middlewares
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(multer({
    dest: config.uploadDir
  }));
  app.use(cookieParser('secreto'));
  app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: true
  }));
  app.use(methodOverride('_method'));
  app.use(express.static(path.join(__dirname, '/../../public')));
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

module.exports = {
  setup: setup,
  guard: guard,
  error: error
};
