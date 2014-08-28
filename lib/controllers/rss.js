/* jslint node: true */
'use strict';

function RssController(ArticleService) {

  // public

  function list(callback) {
    ArticleService.findPublished(callback);
  }

  // expose

  return {
    'list': list
  };
}

module.exports = RssController;
