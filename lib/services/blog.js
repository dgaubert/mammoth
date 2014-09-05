/* jslint node: true */
'use strict';

var async = require('async');

var BlogService = function BlogService (articleDao, captchaDao) {
  this.articleDao = articleDao;
  this.captchaDao = captchaDao;
};

// private

BlogService.prototype._getArticleWithExtraBlogInfo = function _getArticleWithExtraBlogInfo(slug, callback) {
  async.parallel({
      article: async.apply(this.articleDao.findBySlug, slug),
      categories: async.apply(this.articleDao.countCategories),
      tags: async.apply(this.articleDao.countTags),
      lasts: async.apply(this.articleDao.findLastThree),
      captcha: async.apply(this.captchaDao.count)
    },
    callback);
};

// gets article and the info about it
BlogService.prototype._getArticle = function _getArticle(slug, callback) {
  this._getArticleWithExtraBlogInfo(slug, function getArticleWithExtraBlogInfoDone(err, blog) {
    if (err) return callback(err);

    blog.captcha = Math.ceil(Math.random() * (blog.captcha)) + '.png';
    callback(null, blog);
  });
};

// finds articles with the same category
BlogService.prototype._findSimilarArticles = function _findSimilarArticles(blog, callback) {
  var category = blog.article.category;

  this.articleDao.findByCategory(category, function findArticlesByCategoryDone(err, similars) {
    if (err) return callback(err);

    blog.similars = similars;
    callback(null, blog);
  });
};

// public

BlogService.prototype.retrieve = function retrieve(slug, callback) {
  async.waterfall([
      this._getArticle.bind(this, slug),
      this._findSimilarArticles.bind(this)
    ],
    callback);
};

BlogService.prototype.list = function list(page, category, tag, callback) {
  async.parallel({
      articles: async.apply(this.articleDao.findPublishedByCategoryOrTag, category, tag, page),
      count: async.apply(this.articleDao.countPublishedByCategoryOrTag, category, tag)
    },
    callback);
};

module.exports = BlogService;
