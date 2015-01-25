'use strict';

var _ = require('lodash');
var BaseService = require('./base');

var BaseImageService = _.extend(BaseService, {

  list: function () {
    return this.dao.find();
  },

  retrieve: function (name) {
    return this.dao.getFile(name);
  },

  create: function (name, path) {
    return this.dao.saveFile(name, path);
  },

  remove: function (name) {
    return this.dao.removeFile(name);
  }

});

module.exports = BaseImageService;
