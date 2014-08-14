/* jslint node: true */
'use strict';

var mongoose = require('mongoose');
var GridStore = mongoose.mongo.GridStore;

function CaptchaService(Captcha) {

  // public

  function save(name, path, value, callback) {
    var gridStore = new GridStore(mongoose.connection.db, name, 'w', {
      'metadata': {
        'value': value
      },
      'root': 'captchas',
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
  }

  function read(name, callback) {
    var gridStore = new GridStore(mongoose.connection.db, name, 'r', {
      'root': 'captchas',
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
  }

  function find(callback) {
    Captcha
      .find(function findDone(err, files) {
        if (err) {
          callback(err);
        } else {
          callback(null, files);
        }
      });
  }

  function count(callback) {
    Captcha
      .count(function countDone(err, count) {
        if (err) {
          callback(err);
        } else {
          callback(null, count);
        }
      });
  }

  function findByValue(value, callback) {
    Captcha
      .find({
        'metadata.value': value
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
      'root': 'captchas',
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
  }

  // expose

  return {
    'find': find,
    'count': count,
    'save': save,
    'read': read,
    'findByValue': findByValue,
    'remove': remove
  };
}

module.exports = CaptchaService;
