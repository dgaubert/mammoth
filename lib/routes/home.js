module.exports = function (app, Summary) {

  /**
   * Module dependencies
   */
  var async = require('async'); // Control flow

  /**
   * Retrieve a home representation
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   * @return {Object}   view of the home page
   */
  var getHome = function(req, res, next){
    async.parallel({
      summaries: function (callback) {
        Summary.getLast({}, callback);
      },
      categories: function (callback) {
        Summary.categoriesCount(callback);
      }
    },
    function (err, blog) {
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
    });
  };
  
  

};
