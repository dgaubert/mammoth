module.exports = function (Picture) {
  var mongoose = require('mongoose');
  var GridStore = mongoose.mongo.GridStore;

  var pictureService = {

    savePicture: function (name, path, slug, callback) {

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
    },

    readPicture: function (name, callback) {
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
    },

    getPicturesByArticle: function (slug, callback) {
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
    },

    removePicture: function (name, callback) {
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
    }
  };

  return pictureService;
};
