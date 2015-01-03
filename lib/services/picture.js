'use strict';

var di = require('di');
var PictureDao = require('../dao/picture.js');

function PictureService(pictureDao) {
  this.dao = pictureDao;
}

PictureService.prototype = {

  list: function (slug) {
    return this.dao.findByArticle(slug);
  },

  retrieve: function (name) {
    return this.dao.getFile(name);
  },

  create: function (name, path, slug) {
    return this.dao.saveFile(name, path, slug);
  },

  remove: function (name) {
    return this.dao.removeFile(name);
  }

};

di.annotate(PictureService, new di.Inject(PictureDao));

module.exports = PictureService;
