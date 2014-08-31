/* jslint node: true */
'use strict';

var async = require('async');

module.exports = function homeService(articleDao) {

  // public

  function show(callback) {
    async.parallel({
        articles: async.apply(articleDao.findLast),
        categories: async.apply(articleDao.countCategories)
      },
      callback);
  }

  // expose

  return {
    'show': show
  };
};
