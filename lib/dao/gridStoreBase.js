'use strict';

var Q = require('q');
var _ = require('lodash');
var mongoose = require('mongoose');
var GridStore = mongoose.mongo.GridStore;
var BaseDao = require('./base');

var GridStoreBaseDao = _.extend(BaseDao, {

  createGridStore: function (name, mode, metadata) {
    var options = {
      'root': this.getModelName(),
      'content_type': 'image/png',
      'metadata': mode === 'w' ? this.getMetadata(metadata) : undefined
    };

    return new GridStore(mongoose.connection.db, name, mode, options);
  },

  open:  function (name, mode, slug) {
    var gridStore = this.createGridStore(name, mode, slug);
    var openGridStore = Q.nbind(gridStore.open, gridStore);

    return openGridStore();
  },

  write: function (gridStore, path) {
    var writeFile = Q.nbind(gridStore.writeFile, gridStore);
    return writeFile(path);
  },

  read: function (gridStore) {
    var readFile = Q.nbind(gridStore.read, gridStore);
    return readFile();
  },

  unlink: function (gridStore) {
    var unlinkFile = Q.nbind(gridStore.unlink, gridStore);
    return unlinkFile();
  },

  saveFile: function (name, path, metadata) {
    var _this = this;

    return this.open(name, 'w', metadata)
      .then(function (gridStore) {
        return _this.write(gridStore, path);
      });
  },

  getFile: function (name) {
    var _this = this;

    return this.open(name, 'r')
      .then(function (gridStore) {
        return _this.read(gridStore);
      });
  },

  removeFile: function (name) {
    var _this = this;

    return this.open(name, 'r')
      .then(function (gridStore) {
        return _this.unlink(gridStore);
      });
  }

});

module.exports = GridStoreBaseDao;
