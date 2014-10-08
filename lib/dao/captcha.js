'use strict';

var mongoose = require('mongoose');
var GridStore = mongoose.mongo.GridStore;
var _ = require('lodash');

var CaptchaDao = function CaptchaDao(captchaModel) {
  this.captchaModel = captchaModel;

  _.bindAll(this, 'save', 'read', 'find', 'count', 'findByValue', 'remove');
};

CaptchaDao.prototype = {

  // public

  'save': function save(name, value, path, callback) {
    var gridStore = new GridStore(mongoose.connection.db, name, 'w', {
      'metadata': {
        'value': value
      },
      'root': 'captchas',
      'content_type': 'image/png'
    });

    gridStore.open(function openDone(err, gridStore) {
      if (err) return callback(err);

      gridStore.writeFile(path, function done(err, gridStore) {
        if (err) return callback(err);

        callback(null);
      });
    });
  },

  'read': function read(name, callback) {
    var gridStore = new GridStore(mongoose.connection.db, name, 'r', {
      'root': 'captchas',
      'content_type': 'image/png'
    });

    gridStore.open(function done(err, gridStore) {
      if (err) return callback(err, null);

      gridStore.read(function done(err, data) {
        if (err) return callback(err, null);

        callback(null, data);
      });
    });
  },

  'find': function find(callback) {
    this.captchaModel
      .find(function findDone(err, files) {
        if (err) return callback(err);

        callback(null, files);
      });
  },

  'count': function count(callback) {
    this.captchaModel
      .count(function countDone(err, count) {
        if (err) return callback(err);

        callback(null, count);
      });
  },

  'findByValue': function findByValue(value, callback) {
    this.captchaModel
      .find({
        'metadata.value': value
      },
      function findDone(err, files) {
        if (err) return callback(err);

        callback(null, files);
      });
  },

  'remove': function remove(name, callback) {
    var gridStore = new GridStore(mongoose.connection.db, name, 'r', {
      'root': 'captchas',
      'content_type': 'image/png'
    });

    gridStore.open(function done(err, gridStore) {
      if (err) return callback(err);

      gridStore.unlink(function done(err, result) {
        if (err) return callback(err);

        callback(null);
      });
    });
  }
};

module.exports = CaptchaDao;
