'use strict';

var di = require('di');
var PictureDao = require('../dao/picture.js');

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

di.annotate(PictureService, new di.Inject(PictureDao));

module.exports = PictureService;
