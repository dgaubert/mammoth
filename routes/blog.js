/**
 * Module dependencies
 */
var mongoose = require('mongoose'), // DB driver
    db = mongoose.createConnection(require('../config').dbinfo), // DB conexion
    async = require('async'), // Control flow
    summarySchema = require('../models/summary'), // Load schema
    Summary = db.model('Summary', summarySchema), // Load model
    articleSchema = require('../models/article'), // Load schema
    Article = db.model('Article', articleSchema), // Load model
    paginator = require('../utils/paginator'); // Pagination

/**
 * Retrieve a blog summary
 * 
 * @param  {Object}   req : request
 * @param  {Object}   res : response
 * @param  {Function} next : error handler
 * @return {Object}   blog summary
 */
exports.getSummary = function (req, res, next) {
  var page = parseInt(req.params.page, 10) || 0,
      category = req.params.category,
      tag = req.params.tag,
      filter = {};
  if (category) {
    filter = {'category': category};
  } else if (tag) {
    filter = {'tags':{$in:tag}};
  }
  async.parallel({
    summaries: function (callback) {
      Summary.findRange(filter, page, callback);
    },
    count: function (callback) {
      Summary.count(filter, callback);
    }
  },
  function (err, blog) {
    if (err || blog.summaries.length <= 0) {
      next();
    } else {
      res.render('blog', {
        title: 'Blog - Daniel García Aubert',
        section:'blog',
        summaries: blog.summaries,
        pagination: paginator.create(page, blog.count)
      });
    }
  });
};

/**
 * Retrieve the article by the title 
 * 
 * @param  {Object}   req : request
 * @param  {Object}   res : response
 * @param  {Function} next : error handler
 * @return {Object}   view of the article
 */
exports.getArticle =  function (req, res, next) {
  var slug = req.params.slug || '';
  async.parallel({
    article: function (callback) {
      Article.find({'slug': slug}, callback);
    },
    categories: function (callback) {
      Summary.categoriesCount(callback);
    }
  },
  function (err, blog) {
    if (err || blog.article.length <= 0) {
      next();
    } else {
      Summary.find({
        'category': blog.article[0].category},
        {
          '_id': -1, 'title': 1, 'slug': 1
        },
        function (err, similars) {
          res.render('article', {
            title: blog.article[0].title + ' - Blog - Daniel García Aubert',
            section:'blog',
            article: blog.article[0],
            categories: blog.categories[0],
            similars: similars
          });
        }
      );
    }
  });
};