'use strict';

var di = require('di');
var _ = require('lodash');
var Picture = require('../models/picture');
var mongoose = require('mongoose');
var GridStore = mongoose.mongo.GridStore;

var PictureDao = function PictureDao(pictureModel) {
  this.pictureModel = pictureModel;
  _.bindAll(this, 'save', 'read', 'findByArticle', 'remove');
};

PictureDao.prototype = {

  // public

  'save': function save(name, path, slug, callback) {
    var gridStore = new GridStore(mongoose.connection.db, name, 'w', {
      'metadata': {
        'article': slug
      },
      'root': 'pictures',
      'content_type': 'image/png'
    });

    gridStore.open(function openDone(err, gridStore) {
      if (err) {
        return callback(err);
      }

    gridStore.writeFile(path, function done(err /*, gridStore*/) {
          if (err) {
            return callback(err);
          }

          callback(null);
      });
    });
  },

  'read': function read(name, callback) {
    var gridStore = new GridStore(mongoose.connection.db, name, 'r', {
      'root': 'pictures',
      'content_type': 'image/png'
    });

    gridStore.open(function done(err, gridStore) {
      if (err) {
        return callback(err, null);
      }

      gridStore.read(function done(err, data) {
        if (err) {
          return callback(err, null);
        }

        callback(null, data);
      });
    });
  },

  'findByArticle': function findByArticle(slug, callback) {
    this.pictureModel
      .find({
        'metadata.article': slug
      },
      function findDone(err, files) {
        if (err) {
          return callback(err);
        }

        callback(null, files);
      });
  },

  'remove': function remove(name, callback) {
    var gridStore = new GridStore(mongoose.connection.db, name, 'r', {
      'root': 'pictures',
      'content_type': 'image/png'
    });

    gridStore.open(function done(err, gridStore) {
      if (err) {
        return callback(err);
      }

    gridStore.unlink(function done(err /*, result*/) {
        if (err) {
          return callback(err);
        }

        callback(null);
      });
    });
  }
};

di.annotate(PictureDao, new di.Inject(Picture));

module.exports = PictureDao;
