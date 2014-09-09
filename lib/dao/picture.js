/* jslint node: true */
'use strict';

var mongoose = require('mongoose');
var GridStore = mongoose.mongo.GridStore;
var _ = require('lodash');

var PictureDao = function PictureDao(pictureModel) {
  this.pictureModel = pictureModel;

  _.bindAll(this, 'save', 'read', 'findByArticle', 'remove');
};

// public

PictureDao.prototype.save = function save(name, path, slug, callback) {
  var gridStore = new GridStore(mongoose.connection.db, name, 'w', {
    'metadata': {
      'article': slug
    },
    'root': 'pictures',
    'content_type': 'image/png'
  });

  gridStore.open(function openDone(err, gridStore) {
    if (err) {
      callback(err);
    } else {
      gridStore.writeFile(path, function done(err, gridStore) {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }
  });
};

PictureDao.prototype.read = function read(name, callback) {
  var gridStore = new GridStore(mongoose.connection.db, name, 'r', {
    'root': 'pictures',
    'content_type': 'image/png'
  });

  gridStore.open(function done(err, gridStore) {
    if (err) {
      callback(err, null);
    } else {
      gridStore.read(function done(err, data) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
    }
  });
};

PictureDao.prototype.findByArticle = function findByArticle(slug, callback) {
  this.pictureModel
    .find({
      'metadata.article': slug
    },
    function findDone(err, files) {
      if (err) {
        callback(err);
      } else {
        callback(null, files);
      }
    });
};

PictureDao.prototype.remove = function remove(name, callback) {
  var gridStore = new GridStore(mongoose.connection.db, name, 'r', {
    'root': 'pictures',
    'content_type': 'image/png'
  });

  gridStore.open(function done(err, gridStore) {
    if (err) {
      callback(err);
    } else {
      gridStore.unlink(function done(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }
  });
};

module.exports = PictureDao;
