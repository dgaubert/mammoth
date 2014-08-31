/* jslint node: true */
'use strict';

var pwd = require('pwd');
var async = require('async');

module.exports = function loginService(userDao) {

  // private

  // get user by username
  function findUserByUsername(username, password, callback) {
    userDao.findByUsername(username, function (err, user) {
      if (err) return callback(err);
      if (!user) return callback(new Error('User not found'));

      callback(null, user, password);
    });
  }

  // get hash from user's salt and the requested password
  function hashFromPasswordAndSalt(user, password, callback) {
    pwd.hash(password, user.salt, function (err, hash) {
      if (err) return callback(err);
      if (hash.toString('utf-8') !== user.hash) {
        return callback(new Error('Bad password'));
      }

      callback(null, user, hash);
    });
  }


  // public

  function check(username, password, callback) {

    // tasks to perform the login check
    async.waterfall([
        findUserByUsername.bind(null, username, password),
        hashFromPasswordAndSalt
      ],
      callback);
  }

  // expose

  return {
    'check': check
  };
};
