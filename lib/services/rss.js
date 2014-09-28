/* jslint node: true */
'use strict';

var RssService = function RssService(articleDao) {
  this.articleDao = articleDao;
};

RssService.prototype = {

  // public

  'list': function list(callback) {
    this.articleDao.findPublished(callback);
  }
};
module.exports = RssService;
