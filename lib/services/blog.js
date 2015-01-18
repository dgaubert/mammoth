'use strict';

var di = require('di');
var Q = require('q');
var _ = require('lodash');
var base = require('./base');
var ArticleDao = require('../dao/article.js');
var CaptchaDao = require('../dao/captcha.js');

function BlogService (articleDao, captchaDao) {
  this.dao = articleDao;
  this.captchaDao = captchaDao;
}

BlogService.prototype = _.create(base, {

  constructor: BlogService,

  retrieve: function (slug) {
    var _this = this;

    return this.dao.findBySlug(slug)
      .then(function (article) {
        return [
          article,
          _this.dao.countCategories(),
          _this.dao.countTags(),
          _this.dao.findLastThree(),
          _this.captchaDao.count(),
          _this.dao.findByCategory(article.category)
        ];
      })
      .spread(function (article, categories, tags, lasts, captcha, similars) {
        return {
          article: article,
          categories: categories,
          tags: tags,
          lasts: lasts,
          captcha: Math.ceil(Math.random() * (captcha)) + '.png',
          similars: similars
        };
      });
  },

  list: function (page, category, tag) {
    return Q.all([
        this.dao.findPublishedByCategoryOrTag(category, tag, page),
        this.dao.countPublishedByCategoryOrTag(category, tag)
      ])
      .spread(function (articles, count) {
        return {
          articles: articles,
          count: count
        };
      });
  }
  
});

di.annotate(BlogService, new di.Inject(ArticleDao, CaptchaDao));

module.exports = BlogService;
