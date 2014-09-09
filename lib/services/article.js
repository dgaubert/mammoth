/* jslint node: true */
'use strict';

var Article = require('../models/article');
var async = require('async');
var _ = require('lodash');
var articleMapper = require('../mappers/article');

var ArticleService = function ArticleService(articleDao, pictureDao) {
  this.articleDao = articleDao;
  this.pictureDao = pictureDao;
};

// private

// checks if article already exists
ArticleService.prototype._checkArticleExist = function _checkArticleExist(data, callback) {
  this.articleDao.findBySlug(data.slug, function findArticleBySlugDone(err, article) {
    if (err) return callback(err);
    if (article) return callback(new Error('The article already exists'));

    article = new Article();
    article = articleMapper.map(article, data);
    callback(null, article);
  });
};

// get the article to update
ArticleService.prototype._getArticle = function _getArticle(data, callback) {
  this.articleDao.findBySlug(data.slug, function findArticleBySlugDone(err, article) {
    if (err) return callback(err);
    if(!article) return callback(new Error('The article doesn\'t exists'));

    article = articleMapper.map(article, data);
    callback(null, article);
  });
};

// save the article (new or not)
ArticleService.prototype._saveArticle = function _saveArticle(article, callback) {
  article.save(function saveArticleDone(err, article) {
    if (err) return callback(err);

    callback(null, article);
  });
};

// public

ArticleService.prototype.create = function create(data, callback) {
  async.waterfall([
      this._checkArticleExist.bind(this, data),
      this._saveArticle
    ],
    callback);
};

ArticleService.prototype.list = function list(callback) {
  this.articleDao.find(callback);
};

ArticleService.prototype.retrieve = function retrieve(slug, callback) {
  async.parallel({
      article: async.apply(this.articleDao.findBySlug, slug),
      pictures: async.apply(this.pictureDao.findByArticle, slug)
    },
    callback);
};

ArticleService.prototype.update = function update(data, callback) {
  async.waterfall([
      this._getArticle.bind(this, data),
      this._saveArticle
    ],
    callback);
};

module.exports = ArticleService;
