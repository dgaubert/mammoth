/* jslint node: true */
'use strict';

var PictureService = function PictureService(pictureDao) {
  this.pictureDao = pictureDao;
};

PictureService.prototype = {
  // public

  'retrieve': function retrieve(name, callback) {
    this.pictureDao.read(name, callback);
  },

  'create': function create(name, path, slug, callback) {
    this.pictureDao.save(name, path, slug, callback);
  },

  'remove': function remove(name, callback) {
    this.pictureDao.remove(name, callback);
  }
};

module.exports = PictureService;
