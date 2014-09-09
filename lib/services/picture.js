/* jslint node: true */
'use strict';

var PictureService = function PictureService(pictureDao) {
  this.pictureDao = pictureDao;
};

// public

PictureService.prototype.retrieve = function retrieve(name, callback) {
  this.pictureDao.read(name, callback);
};

PictureService.prototype.create = function create(name, path, slug, callback) {
  this.pictureDao.save(name, path, slug, callback);
};

PictureService.prototype.remove = function remove(name, callback) {
  this.pictureDao.remove(name, callback);
};

module.exports = PictureService;
