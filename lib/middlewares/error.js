var errorMiddleware = function errorMiddleware() {

  var middleware = {

    // 
    notFound: function notFound(req, res, next) {
      res.status(404);
      res.render('error/404', {
        section: null,
        url: req.url
      });
    },

    //
    serverError: function serverError(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error/500', {
        section: null,
        error: err
      });
    }
  };

  return middleware;
};

module.exports = errorMiddleware;
