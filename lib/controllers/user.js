/* jslint node: true */
'use strict';

var User = require('../models/user');
var pwd = require('pwd');

function UserController(UserService) {

  // public

  function list(callback) {
    UserService.find(callback);
  }

  function create(username, password, callback) {

    UserService.findByUsername(username, function findByUsernameDone(err, user) {
      if (err) {
        return callback(err);
      }
      if (user) {
        return callback(new Error('The user already exists'));
      }

      pwd.hash(password, function pwdHashDone(err, salt, hash) {
        var user = new User();

        user.username = username;
        user.salt = salt;
        user.hash = hash;

        user.save(function saveUserDone(err) {
          if (err) {
            return callback(err);
          }
          callback(null, user);
        });
      });
    });
  }

  function retrieve(username, callback) {
    UserService.findByUsername(username, callback);
  }

  function update(oldUsername, newUsername, newpassword, callback) {
    UserService.findByUsername(oldUsername, function findByUsernameDone(err, user) {
      if (err) {
        return callback(err);
      }

      function save(user) {
        user.save(function done(err) {
          if (err) {
            return callback(err);
          }
          callback(null, user);
        });
      }

      user.username = newUsername;
      if (newpassword) {
        pwd.hash(newpassword, function pwdHashDone(err, salt, hash) {
          user.salt = salt;
          user.hash = hash;

          save(user);
        });
      } else {
        save(user);
      }
    });
  }

  // expose

  return {
    'create': create,
    'list': list,
    'retrieve': retrieve,
    'update': update
  };
}

module.exports = UserController;
