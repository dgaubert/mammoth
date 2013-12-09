var Picture = require('../models/picture'),
    mongoose = require('mongoose'),
    GridStore = mongoose.mongo.GridStore;

module.exports.savePicture = function (name, path, slug, callback) {

  var gridStore = new GridStore(mongoose.connection.db, name, 'w', {
        'metadata': {
          'article': slug
        },
        'root': 'pictures',
        'content_type': 'image/png'
      });

  gridStore.open(function (err, gridStore) {
    if (err) {
      callback(err);
    } else {
      gridStore.writeFile(path, function (err, gridStore) {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }
  });
};

module.exports.readPicture = function (name, callback) {
  var gridStore = new GridStore(mongoose.connection.db, name, 'r', {
    'root': 'pictures',
    'content_type': 'image/png'
  });

  gridStore.open(function (err, gridStore) {
    if (err) {
      callback(err, null);
    } else {
      gridStore.read(function (err, data) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
    }
  });
};

module.exports.getPicturesByArticle = function (slug, callback) {
  Picture
    .find({
      'metadata.article': slug
    }, function (err, files) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, files);
      }
    });
};

module.exports.removePicture = function (name, callback) {
  var gridStore = new GridStore(mongoose.connection.db, name, 'r', {
    'root': 'pictures',
    'content_type': 'image/png'
  });

  gridStore.open(function (err, gridStore) {
    if (err) {
      callback(err);
    } else {
      gridStore.unlink(function (err, result) {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }
  });

};
