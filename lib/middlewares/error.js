/* jslint node: true */
'use strict';

function ErrorMiddleware() {

  function notFound(req, res, next) {
    res.status(404);
    res.render('error/404', {
      section: null,
      url: req.url
    });
  }

  function serverError(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/500', {
      section: null,
      error: err
    });
  }

  return {
    'notFound': notFound,
    'serverError': serverError
  };
}

module.exports = ErrorMiddleware;
