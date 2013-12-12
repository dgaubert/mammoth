/**
 * Module dependencies
 */
var async = require('async'), // Control flow
    parser = require('../utils/mdparser');

module.exports = function (ArticleService) {

  return {
    /**
     * Retrieve a home representation
     * 
     * @param  {Object}   req : request
     * @param  {Object}   res : response
     * @param  {Function} next : error handler
     * @return {Object}   view of the home page
     */
    getHome: function(req, res, next) {
      var tasks = {
        articles: function (callback) {
          ArticleService.findLast(callback);
        },
        categories: function (callback) {
          ArticleService.categoriesCount(callback);
        }
      };

      async.parallel(tasks, function (err, blog) {
        if (err) {
          return next(err);
        }
        res.render('home', {
          title: 'Daniel García Aubert - Software Engineer',
          section:'home',
          articles: parser(blog.articles),
          categories: blog.categories[0]
        });
      });
    }
  };
};
