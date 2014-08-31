/* jslint node: true */
'use strict';

module.exports = function rssService(articleDao) {

  // public

  function list(callback) {
    articleDao.findPublished(callback);
  }

  // expose

  return {
    'list': list
  };
};
