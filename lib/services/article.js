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
    return this.dao.find();
  },

  create: function (data) {
    var _this = this;

    return this.dao.checkIfNotExits(data.slug)
      .then(function () {
        return _this.dao.create(data);
      });
  },

  update: function (data) {
    var _this = this;

    return this.dao.findBySlug(data.slug)
      .then(function (article) {
        var updatedArticle = _.assign(article, data);
        return _this.dao.save(updatedArticle);
      });
  },

  retrieve: function (slug) {
    return Q.all([
      this.dao.findBySlug(slug),
      this.pictureDao.findByArticle(slug)
    ])
    .spread(function (article, pictures) {
      return {
        article: article,
        pictures: pictures
      };
    });
  }

};

di.annotate(ArticleService, new di.Inject(ArticleDao, PictureDao));

module.exports = ArticleService;
