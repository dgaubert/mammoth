/* jslint node: true */
'use strict';

var Article = require('../models/article');
var async = require('async');

var ArticleService = function ArticleService(articleDao, pictureDao) {
  this.articleDao = articleDao;
  this.pictureDao = pictureDao;
};

// private

ArticleService.prototype._createAndPopulate = function createAndPopulate(data) {
  var article = new Article();

  return this._populate(article, data);
};

ArticleService.prototype._populate = function _populate(article, data) {
  article.title = data.title;
  article.author = data.author;
  article.slug = data.slug;
  article.category = data.category;
  article.abstract = data.abstract;
  article.content = data.content;
  article.tags = data.tags;
  article.published = data.published ? true : false;

  return article;
};

// checks if article already exists
ArticleService.prototype.checkArticleExist = function checkArticleExist(data, callback) {
  var createAndPopulate = this._createAndPopulate.bind(this, data);

  this.articleDao.findBySlug(data.slug, function findArticleBySlugDone(err, article) {
    if (err) return callback(err);
    if (article) return callback(new Error('The article already exists'));

    article = createAndPopulate(data);
    callback(null, article);
  });
};

// get the article to update
ArticleService.prototype.getArticle = function getArticle(data, callback) {
  var populate = this._populate.bind(this);

  this.articleDao.findBySlug(data.slug, function findArticleBySlugDone(err, article) {
    if (err) return callback(err);
    if(!article) return callback(new Error('The article doesn\'t exists'));

    article = populate(article, data);
    callback(null, article);
  });
};

// save the article (new or not)
ArticleService.prototype.saveArticle = function saveArticle(article, callback) {
  article.save(function saveArticleDone(err, article) {
    if (err) return callback(err);

    callback(null, article);
  });
};

// public

ArticleService.prototype.create = function create(data, callback) {
  async.waterfall([
      this.checkArticleExist.bind(this, data),
      this.saveArticle
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
      this.getArticle.bind(this, data),
      this.saveArticle
    ],
    callback);
};

module.exports = ArticleService;
