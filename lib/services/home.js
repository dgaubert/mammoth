/* jslint node: true */
'use strict';

var async = require('async');

var HomeService = function HomeService(articleDao) {
  this.articleDao = articleDao;
};

// public

HomeService.prototype.show = function show(callback) {
  async.parallel({
      articles: async.apply(this.articleDao.findLast),
      categories: async.apply(this.articleDao.countCategories)
    },
    callback);
};

module.exports = HomeService;
