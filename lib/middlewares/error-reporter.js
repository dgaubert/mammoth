module.exports = function () {

  var errorReporter = {

    /**
     * 
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    notFound: function (req, res, next) {
      res.status(404);
      res.render('error/404', {
        section: null,
        url: req.url
      });
    },

    /**
     * 
     * @param  {[type]}   err  [description]
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    serverError: function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error/500', {
        section: null,
        error: err
      });
    }
  };

  // Expose reporter
  return errorReporter;
};
