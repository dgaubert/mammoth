'use strict';

var di = require('di');
var Q = require('q');
var _ = require('lodash');
var base = require('./base');
var ArticleDao = require('../dao/article.js');

function HomeService(articleDao) {
  this.dao = articleDao;
}

HomeService.prototype = _.create(base, {

  constructor: HomeService,

  show: function () {
    return Q.all([
        this.dao.findLast(),
        this.dao.countCategories()
      ])
      .spread(function (articles, categories) {
        return {
          articles: articles,
          categories: categories
        };
      });
  }

});

di.annotate(HomeService, new di.Inject(ArticleDao));

module.exports = HomeService;
