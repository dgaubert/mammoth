/* jslint node: true */
'use strict';

var async = require('async');

function HomeController(ArticleService) {

  // public

  function show(callback) {
    var showTasks = {
      articles: async.apply(ArticleService.findLast),
      categories: async.apply(ArticleService.countCategories)
    };

    async.parallel(showTasks, callback);
  }

  // expose

  return {
    'show': show
  };
}

module.exports = HomeController;
