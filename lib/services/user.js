/* jslint node: true */
'use strict';

var User = require('../models/user');
var pwd = require('pwd');
var async = require('async');

module.exports = function userService(userDao) {

  // private

  // checks if user already exists
  function checkUsersExits(username, password, callback) {
    userDao.findByUsername(username, function findByUsernameDone(err, user) {
      if (err) return callback(err);
      if (user) return callback(new Error('The user already exists'));

      callback(null, username, password);
    });
  }

  function hash(username, password, callback) {
    pwd.hash(username, password, function pwdHashDone(err, salt, hash) {
      if (err) return callback(err);

      var user = new User();

      user.username = username;
      user.salt = salt;
      user.hash = hash;

      callback(null, user);
    });
  }

  function findUserByUsername(username, userData, callback) {
    userDao.findByUsername(username, function (err, user) {
      if (err) return callback(err);

      callback(null, user, userData);
    });
  }

  function populateUser(user, userData, callback) {
    user.username = userData.username;
    if (userData.password) {
      pwd.hash(userData.password, function pwdHashDone(err, salt, hash) {
        if (err) return callback(err);

        user.salt = salt;
        user.hash = hash;
        callback(null, user);
      });
    } else {
      callback(null, user);
    }
  }

  function saveUser(user, callback) {
    user.save(function saveUserDone(err, user) {
      if (err) return callback(err);

      callback(null, user);
    });
  }

  // public

  function list(callback) {
    userDao.find(callback);
  }

  function create(username, password, callback) {
    async.waterfall([
        checkUsersExits.bind(null, username, password),
        hash,
        saveUser
      ],
      callback);
  }

  function retrieve(username, callback) {
    userDao.findByUsername(username, callback);
  }

  function update(oldUsername, userData, callback) {
    async.waterfall([
        findUserByUsername.bind(null, oldUsername, userData),
        populateUser,
        saveUser
      ],
      callback);
  }

  // expose

  return {
    'create': create,
    'list': list,
    'retrieve': retrieve,
    'update': update
  };
};
