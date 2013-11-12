/**
 * Module dependencies
 */
var async = require('async'), // Control flow
    parser = require('../utils/mdparser');

module.exports = function (Article) {

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
      articles: function (callback) {
        Article.find({'published': true})
          .sort({created: -1})
          .limit(1)
          .exec(callback);
      },
      categories: function (callback) {
        Article.categoriesCount(callback);
      }
    };

    var done = function (err, blog) {
      if (err) {
        next();
      } else {
        res.render('home', {
          title: 'Daniel García Aubert - Software Engineer',
          section:'home',
          articles: parser(blog.articles),
          categories: blog.categories[0]
        });
      }
    };

    async.parallel(tasks, done);
  };

};
