/* jslint node: true */
'use strict';

var User = require('../models/user');
var userMapper = require('../mappers/user');

var pwd = require('pwd');
var async = require('async');

var UserService = function UserService(userDao) {
  this.userDao = userDao;
};

// private

// checks if user already exists
UserService.prototype._checkUsersExits = function _checkUsersExits(userData, callback) {
  this.userDao.findByUsername(userData.username, function findByUsernameDone(err, user) {
    if (err) return callback(err);
    if (user) return callback(new Error('The user already exists'));

    callback(null, userData);
  });
};

UserService.prototype._hash = function _hash(userData, callback) {
  pwd.hash(userData.username, userData.password, function hashDone(err, salt, hash) {
    if (err) return callback(err);

    var user = userMapper.map(new User(), userData, salt, hash);
    callback(null, user);
  });
};

UserService.prototype._findUserByUsername = function _findUserByUsername(username, userData, callback) {
  this.userDao.findByUsername(username, function (err, user) {
    if (err) return callback(err);

    callback(null, user, userData);
  });
};

UserService.prototype._populateUser = function _populateUser(user, userData, callback) {
  if (userData.password) {
    pwd.hash(userData.password, function pwdHashDone(err, salt, hash) {
      if (err) return callback(err);

      user = userMapper.map(user, userData, salt, hash);
      callback(null, user);
    });
  } else {
    callback(null, user);
  }
};

UserService.prototype._saveUser = function _saveUser(user, callback) {
  user.save(function _saveUserDone(err, user) {
    if (err) return callback(err);

    callback(null, user);
  });
};

// public

UserService.prototype.list = function list(callback) {
  this.userDao.find(callback);
};

UserService.prototype.create = function create(userData, callback) {
  async.waterfall([
      this._checkUsersExits.bind(this, userData),
      this._hash.bind(this),
      this._saveUser.bind(this)
    ],
    callback);
};

UserService.prototype.retrieve = function retrieve(username, callback) {
  this.userDao.findByUsername(username, callback);
};

UserService.prototype.update = function update(oldUsername, userData, callback) {
  async.waterfall([
      this._findUserByUsername.bind(this, oldUsername, userData),
      this._populateUser.bind(this),
      this._saveUser.bind(this)
    ],
    callback);
};

module.exports = UserService;
