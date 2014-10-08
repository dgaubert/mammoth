'use strict';

var pwd = require('pwd');
var async = require('async');

var LoginService = function LoginService(userDao) {
  this.userDao = userDao;
};


LoginService.prototype = {

  // private

  // get user by username
  '_findUserByUsername': function _findUserByUsername(username, password, callback) {
    this.userDao.findByUsername(username, function (err, user) {
      if (err) return callback(err);
      if (!user) return callback(new Error('User not found'));

      callback(null, user, password);
    });
  },

  // get hash from user's salt and the requested password
  '_hashFromPasswordAndSalt': function _hashFromPasswordAndSalt(user, password, callback) {
    pwd.hash(password, user.salt, function (err, hash) {
      if (err) return callback(err);
      if (hash.toString('utf-8') !== user.hash) {
        return callback(new Error('Bad password'));
      }

      callback(null, user, hash);
    });
  },

  // public

  'check': function check(username, password, callback) {

    // tasks to perform the login check
    async.waterfall([
        this._findUserByUsername.bind(this, username, password),
        this._hashFromPasswordAndSalt.bind(this)
      ],
      callback);
  }
};

module.exports = LoginService;
