'use strict';

var di = require('di');
var _ = require('lodash');
var Q = require('q');
var ArticleDao = require('../dao/article.js');
var PictureDao = require('../dao/picture.js');

function ArticleService(articleDao, pictureDao) {
  this.dao = articleDao;
  this.pictureDao = pictureDao;
}

ArticleService.prototype = {

  list: function () {
    return this.articleDao.find();
  },

  create: function (data) {
    var _this = this;

    return this.articleDao.checkIfNotExits(data.slug)
      .then(function () {
        return _this.articleDao.create(data);
      });
  },

  update: function (data) {
    var _this = this;

    return this.findBySlug(data.slug)
      .then(function (article) {
        var updatedArticle = _.assign(article, data);
        return _this.save(updatedArticle);
      });
  },

  retrieve: function (slug) {
    return Q.all([
      this.dao.findBySlug(slug),
      this.pictureDao.findByArticle(slug)
    ]);
  }

};

di.annotate(ArticleService, new di.Inject(ArticleDao, PictureDao));

module.exports = ArticleService;
