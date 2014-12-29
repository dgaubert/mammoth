'use strict';

var di = require('di');
var _ = require('lodash');
var GridStoreBaseDao = require('./gridStoreBase');
var Picture = require('../models/picture');

function PictureDao(pictureModel) {
  this.Model = pictureModel;
}

PictureDao.prototype = _.create(GridStoreBaseDao, {

  getRoot: function () {
    return 'pictures';
  },

  getMetadata: function (metadata) {
    return { 'article': metadata };
  },

  findByArticle: function (slug) {
    return this.find({ 'metadata.article': slug });
  }

});

di.annotate(PictureDao, new di.Inject(Picture));

module.exports = PictureDao;
