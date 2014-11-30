'use strict';

var di = require('di');
var async = require('async');
var ArticleDao = require('../dao/article.js');

var HomeService = function HomeService(articleDao) {
  this.articleDao = articleDao;
};

// public

HomeService.prototype = {
  'show': function show(callback) {
    async.parallel({
        articles: async.apply(this.articleDao.findLast.bind(this.articleDao)),
        categories: async.apply(this.articleDao.countCategories.bind(this.articleDao))
      },
      callback);
  }
};

di.annotate(HomeService, new di.Inject(ArticleDao));

module.exports = HomeService;
