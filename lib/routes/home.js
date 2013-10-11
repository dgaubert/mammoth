/**
 * Module dependencies
 */
var async = require('async'); // Control flow

module.exports = function (Summary) {

  /**
   * Retrieve a home representation
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   * @return {Object}   view of the home page
   */
  this.getHome = function(req, res, next){

    var tasks = {
      summaries: function (callback) {
        Summary.getLast({}, callback);
      },
      categories: function (callback) {
        Summary.categoriesCount(callback);
      }
    };

    var done = function (err, blog) {
      if (err) {
        next();
      } else {
        res.render('home', {
          title: 'Daniel García Aubert - Software Engineer',
          section:'home',
          summaries: blog.summaries,
          categories: blog.categories[0]
        });
      }
    };

    async.parallel(tasks, done);
  };

};
