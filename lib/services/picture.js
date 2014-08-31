/* jslint node: true */
'use strict';

module.exports = function pictureService(pictureDao) {

  // public

  function retrieve(name, callback) {
    pictureDao.read(name, callback);
  }

  function create(name, path, slug, callback) {
    pictureDao.save(name, path, slug, callback);
  }

  function remove(name, callback) {
    pictureDao.remove(name, callback);
  }

  // expose

  return {
    'retrieve': retrieve,
    'create': create,
    'remove': remove
  };
};
