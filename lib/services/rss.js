'use strict';

var di = require('di');
var ArticleDao = require('../dao/article.js');

var RssService = function RssService(articleDao) {
  this.articleDao = articleDao;
};

RssService.prototype = {

  // public

  'list': function list(callback) {
    this.articleDao.findPublished(callback);
  }
};

di.annotate(RssService, new di.Inject(ArticleDao));

module.exports = RssService;
