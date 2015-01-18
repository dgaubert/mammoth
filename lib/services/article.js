'use strict';

var di = require('di');
var _ = require('lodash');
var base = require('./base');
var ArticleDao = require('../dao/article.js');

function ArticleService(articleDao) {
  this.dao = articleDao;
}

ArticleService.prototype = _.create(base, {

  constructor: ArticleService,

  create: function (data) {
    var _this = this;

    return this.dao.checkIfNotExits(data.slug)
      .then(function () {
        return _this.dao.create(data);
      });
  },

  update: function (id, data) {
    var _this = this;

    return this.dao.findBySlug(data.slug)
      .then(function (article) {
        var updatedArticle = _.assign(article, data);
        return _this.dao.save(updatedArticle);
      });
  },

  retrieve: function (slug) {
    return this.dao.findBySlug(slug);
  }

});

di.annotate(ArticleService, new di.Inject(ArticleDao));

module.exports = ArticleService;
