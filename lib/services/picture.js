'use strict';

var di = require('di');
var _ = require('lodash');
var PictureDao = require('../dao/picture.js');
var BaseImageService = require('./base.image');

function PictureService(pictureDao) {
  this.dao = pictureDao;
}

PictureService.prototype = _.create(BaseImageService, {

  constructor: PictureService,

  list: function (slug) {
    return this.dao.findByArticle(slug);
  },

  create: function (name, path, slug) {
    return this.dao.saveFile(name, path, slug);
  }

});

di.annotate(PictureService, new di.Inject(PictureDao));

module.exports = PictureService;
