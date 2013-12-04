var GridStore = require('mongodb').GridStore,
    Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    db = new Db('mammoth', new Server(process.env.MONGO_HOST, process.env.MONGO_PORT));

module.exports.savePicture = function (name, path, callback) {
  // Establish connection to db
  db.open(function (err, db) {
    // Create a new instance of the gridstore
    var gridStore = new GridStore(db, name, 'w', {
      'root': 'pictures',
      'content_type': 'image/png'
    });
    // Open the file
    gridStore.open(function (err, gridStore) {
      // Write some data to the file
      gridStore.writeFile(path, function (err, gridStore) {
        // Close (Flushes the data to MongoDB)
        gridStore.close(function (err, result) {
          if(err) {
            callback(new Error());
          } else {
            callback(null);
          }
          db.close();
        });
      });
    });

  });
};

module.exports.readPicture = function (name, callback) {

  // Establish connection to db
  db.open(function (err, db) {
    if (err) {
      callback(err, null);
    } else {
      var gridStore = new GridStore(db, name, 'r', {
        'root': 'pictures',
        'content_type': 'image/png'
      });
      // Open the file
      gridStore.open(function (err, gridStore) {
        if (err) {
          db.close();
          callback(err, null);
        } else {
          gridStore.read(function (err, data) {
            if (err) {
              callback(err, null);
            } else {
              // Close (Flushes the data to MongoDB)
              gridStore.close(function (err, result) {
                if(err) {
                  callback(err, null);
                } else {
                  callback(null, data);
                }
                db.close();
              });
            }
          });
        }
      });
    }
  });
};
