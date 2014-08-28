/* jslint node: true */
'use strict';

var pwd = require('pwd');
var async = require('async');

function LoginController(UserService) {

  // public

  function check(username, password, callback) {

    // tasks to perform the login check
    var loginTasks = [

      // get user by username
      function findByUsernameTask(callback) {
        UserService.findByUsername(username, function (err, user) {
          if (err) {
            return callback(err);
          }

          if (!user) {
            return callback(new Error('User not found'));
          }

          callback(null, user);
        });
      },

      // get hash from user's salt and the requested password
      function hashTask(user, callback) {
        pwd.hash(password, user.salt, function (err, hash) {
          if (err) {
            return callback(err);
          }

          if (hash.toString('utf-8') !== user.hash) {
            return callback(new Error('Bad password'));
          }

          callback(null, user, hash);
        });
      }
    ];

    async.waterfall(loginTasks, callback);
  }

  // expose

  return {
    'check': check
  };
}

module.exports = LoginController;
