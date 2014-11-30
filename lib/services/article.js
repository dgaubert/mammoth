'use strict';

var di = require('di');
var Article = require('../models/article');
var async = require('async');
var articleMapper = require('../mappers/article');
var ArticleDao = require('../dao/article.js');
var PictureDao = require('../dao/picture.js');

var ArticleService = function ArticleService(articleDao, pictureDao) {
  this.articleDao = articleDao;
  this.pictureDao = pictureDao;
};

ArticleService.prototype = {

  // private

  '_checkArticleDoesNotExist': function _checkArticleDoesNotExist(slug, callback) {
    this.articleDao.findBySlug(slug, function findArticleBySlugDone(err, article) {
      if (err) {
        return callback(err);
      }
      if (article) {
        return callback(new Error('The article already exists'));
      }

      callback(null);
    });
  },

  '_mergeDataArticle': function _mergeDataArticle(article, data, callback) {
    article = articleMapper.map(article, data);
    callback(null, article);
  },

  '_getArticle': function _getArticle(slug, data, callback) {
    this.articleDao.findBySlug(slug, function findArticleBySlugDone(err, article) {
      if (err) {
        return callback(err);
      }
      if (!article) {
        return callback(new Error('The article doesn\'t exists'));
      }

      callback(null, article, data);
    });
  },

  // create new article
  '_newArticle': function _newArticle(data, callback) {
    var article = new Article(data);
    callback(null, article);
  },

  // save the article (new or not)
  '_saveArticle': function _saveArticle(article, callback) {
    article.save(function saveArticleDone(err, article) {
      if (err) {
        return callback(err);
      }

      callback(null, article);
    });
  },

  // public

  'create': function create(data, callback) {
    async.waterfall([
        this._checkArticleDoesNotExist.bind(this, data.slug),
        this._newArticle.bind(this, data),
        this._saveArticle
      ],
      callback);
  },

  'update': function update(data, callback) {
    async.waterfall([
        this._getArticle.bind(this, data.slug, data),
        this._mergeDataArticle,
        this._saveArticle
      ],
      callback);
  },

  'list': function list(callback) {
    this.articleDao.find(callback);
  },

  'retrieve': function retrieve(slug, callback) {
    async.parallel({
        article: async.apply(this.articleDao.findBySlug, slug),
        pictures: async.apply(this.pictureDao.findByArticle, slug)
      },
      callback);
  }

};

di.annotate(ArticleService, new di.Inject(ArticleDao, PictureDao));

module.exports = ArticleService;
