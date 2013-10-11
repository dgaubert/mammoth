/**
 * Module dependencies
 */
var async = require('async'), // Control flow
    Paginator = require('../utils/paginator'); // Pagination

module.exports = function (Article, Summary) {

  /**
   * Retrieve a blog summary
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   * @return {Object}   blog summary
   */
  this.getSummary = function (req, res, next) {
    var page = parseInt(req.params.page, 10) || 0,
        category = req.params.category,
        tag = req.params.tag,
        filter = {};

    if (category) {
      filter = {'category': category};
    } else if (tag) {
      filter = {'tags': {$in: tag}};
    }

    var tasks = {
      summaries: function (callback) {
        Summary.findRange(filter, page, callback);
      },
      count: function (callback) {
        Summary.count(filter, callback);
      }
    };

    var done = function (err, blog) {
      if (err || blog.summaries.length <= 0) {
        next();
      } else {
        res.render('blog/blog', {
          title: 'Blog - Daniel García Aubert',
          section:'blog',
          summaries: blog.summaries,
          pagination: new Paginator(page, blog.count)
        });
      }
    };

    async.parallel(tasks, done);

  };
  
  /**
   * Retrieve the article by the title 
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   * @return {Object}   view of the article
   */
  this.getArticle =  function (req, res, next) {
    var slug = req.params.slug || '';

    var tasks = {
      article: function (callback) {
        Article.find({'slug': slug}, callback);
      },
      categories: function (callback) {
        Summary.categoriesCount(callback);
      }
    };

    var done = function (err, blog) {
      if (err || blog.article.length <= 0) {
        next();
      } else {
        Summary.find({
            'category': blog.article[0].category
          }, {
            '_id': -1, 'title': 1, 'slug': 1
          },
          function (err, similars) {
            res.render('blog/article', {
              title: blog.article[0].title + ' - Blog - Daniel García Aubert',
              section:'blog',
              article: blog.article[0],
              categories: blog.categories[0],
              similars: similars
            });
          }
        );
      }
    };

    async.parallel(tasks, done);

  };
    
};
