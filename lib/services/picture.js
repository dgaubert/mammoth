var pictureService = function pictureService(Picture) {
  var mongoose = require('mongoose');
  var GridStore = mongoose.mongo.GridStore;

  var service = {

    //
    save: function save(name, path, slug, callback) {
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
          gridStore.writeFile(path, function writeFileDone(err, gridStore) {
            if (err) {
              callback(err);
            } else {
              callback(null);
            }
          });
        }
      });
    },

    //
    read: function read(name, callback) {
      var gridStore = new GridStore(mongoose.connection.db, name, 'r', {
        'root': 'pictures',
        'content_type': 'image/png'
      });

      gridStore.open(function openDone(err, gridStore) {
        if (err) {
          callback(err, null);
        } else {
          gridStore.read(function readDone(err, data) {
            if (err) {
              callback(err, null);
            } else {
              callback(null, data);
            }
          });
        }
      });
    },

    //
    findByArticle: function findByArticle(slug, callback) {
      Picture
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
    },

    //
    remove: function remove(name, callback) {
      var gridStore = new GridStore(mongoose.connection.db, name, 'r', {
        'root': 'pictures',
        'content_type': 'image/png'
      });

      gridStore.open(function openDone(err, gridStore) {
        if (err) {
          callback(err);
        } else {
          gridStore.unlink(function unlinkDone(err, result) {
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

  return service;
};

module.exports = pictureService;
