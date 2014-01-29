/* jslint node: true */
'use strict';

var express = require('express');
var settings = require('./conf/settings');
var middlewares = require('./conf/middlewares');
var routes = require('./conf/routes');

var app = express();

// initialize conf
settings.init(app);

// commons middleware
middlewares.setup(app);

// Check if DB is ready
middlewares.checkDB(app);

// restrict private area middleware
middlewares.guard(app);

// routing
routes.init(app);

// error reporter
middlewares.error(app);

// expose application
module.exports = app;
