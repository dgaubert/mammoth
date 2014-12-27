'use strict';

var di = require('di');
var ArticleDao = require('../dao/article.js');

function RssService(articleDao) {
  this.dao = articleDao;
}

RssService.prototype = {

  list: function () {
    return this.dao.findPublished();
  }

};

di.annotate(RssService, new di.Inject(ArticleDao));

module.exports = RssService;
