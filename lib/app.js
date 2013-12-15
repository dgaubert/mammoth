var express = require('express'),
    settings = require('./conf/settings'),
    middlewares = require('./conf/middlewares'),
    routes = require('./conf/routes');

var app = express();

// initialize conf
settings.init(app);

// common middleware
middlewares.setup(app);

// restrict private area middleware
middlewares.guard(app);

// routing
routes.init(app);

// error reporter
middlewares.error(app);

// expose for testing
module.exports = app;
