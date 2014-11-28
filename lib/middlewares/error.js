/* jshint unused: false */
'use strict';

var ErrorMiddleware = function ErrorMiddleware() {};
var logger = require('../logger');

ErrorMiddleware.prototype = {

  // public

  'notFound': function notFound(req, res, next) {
    res.status(404);
    res.render('error/404', {
      section: null,
      url: req.url
    });
  },

  'serverError': function serverError(err, req, res, next) {
    logger.error(err.stack);
    res.status(err.status || 500);
    res.render('error/500', {
      section: null,
      error: err
    });
  }
};

module.exports = ErrorMiddleware;
