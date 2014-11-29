'use strict';

var di = require('di');
var express = require('express');

var routes = require('./routes.js');

function RouterProvider() {
    var router = express.Router();

    Array.prototype.slice.call(arguments).forEach(function(routes) {
        routes.addTo(router);
    });

    return router;
}

// hack
var injection = new di.Inject();
injection.tokens = routes;

di.annotate(RouterProvider, injection);
di.annotate(RouterProvider, new di.Provide(express.Router));

module.exports = RouterProvider;
