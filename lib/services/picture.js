var mongoose = require('mongoose');
var GridStore = mongoose.mongo.GridStore;

function pictureService(Picture) {

  function save(name, path, slug, callback) {
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
  }

  function read(name, callback) {
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
  }

  function findByArticle(slug, callback) {
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
  }

  function remove(name, callback) {
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

  return {
    'save': save,
    'read': read,
    'findByArticle': findByArticle,
    'remove': remove
  };
}

module.exports = pictureService;
