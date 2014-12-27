'use strict';

var di = require('di');
var PictureDao = require('../dao/picture.js');

var PictureService = function PictureService(pictureDao) {
  this.dao = pictureDao;
};

PictureService.prototype = {

  'retrieve': function retrieve(name) {
    return this.dao.read(name);
  },

  'create': function create(name, path, slug) {
    return this.dao.save(name, path, slug);
  },

  'remove': function remove(name) {
    return this.dao.remove(name);
  }

};

di.annotate(PictureService, new di.Inject(PictureDao));

module.exports = PictureService;
