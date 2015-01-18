'use strict';

var di = require('di');
var _ = require('lodash');
var base = require('./base');
var ArticleDao = require('../dao/article.js');

function RssService(articleDao) {
  this.dao = articleDao;
}

RssService.prototype = _.create(base, {

  constructor: RssService,

  list: function () {
    return this.dao.findPublished();
  }

});

di.annotate(RssService, new di.Inject(ArticleDao));

module.exports = RssService;
