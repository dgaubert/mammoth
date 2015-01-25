'use strict';

var di = require('di');
var _ = require('lodash');
var BaseImageDao = require('./base.image');
var Picture = require('../models/picture');

function PictureDao(pictureModel) {
  this.Model = pictureModel;
}

PictureDao.prototype = _.create(BaseImageDao, {

  getRoot: function () {
    return 'pictures';
  },

  getMetadata: function (metadata) {
    return {
      'article': metadata
    };
  },

  findByArticle: function (slug) {
    return this.find({
      'metadata.article': slug
    });
  }

});

di.annotate(PictureDao, new di.Inject(Picture));

module.exports = PictureDao;
