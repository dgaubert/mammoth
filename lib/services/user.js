'use strict';

var di = require('di');
var Q = require('q');
var User = require('../models/user');
var userMapper = require('../mappers/user');
var pwd = require('pwd');
var async = require('async');
var UserDao = require('../dao/user.js');

var UserService = function UserService(userDao) {
  this.userDao = userDao;
};

UserService.prototype = {

  // private

  // checks if user already exists
  '_checkUsersExits': function _checkUsersExits(userData, callback) {
    this.userDao.findByUsername(userData.username, function findByUsernameDone(err, user) {
      if (err) {
        return callback(err);
      }
      if (user) {
        return callback(new Error('The user already exists'));
      }

      callback(null, userData);
    });
  },

  '_hash': function _hash(userData, callback) {
    pwd.hash(userData.username, userData.password, function hashDone(err, salt, hash) {
      if (err) {
        return callback(err);
      }

      var user = userMapper.map(new User(), userData, salt, hash);
      callback(null, user);
    });
  },

  '_findUserByUsername': function _findUserByUsername(username, userData, callback) {
    this.userDao.findByUsername(username, function (err, user) {
      if (err) {
        return callback(err);
      }

      callback(null, user, userData);
    });
  },

  '_populateUser': function _populateUser(user, userData, callback) {
    if (!userData.password) {
      return callback(null, user);
    }

    pwd.hash(userData.password, function pwdHashDone(err, salt, hash) {
      if (err) {
        return callback(err);
      }

      user = userMapper.map(user, userData, salt, hash);
      callback(null, user);
    });
  },

  '_saveUser': function _saveUser(user, callback) {
    user.save(function _saveUserDone(err, user) {
      if (err) {
        return callback(err);
      }

      callback(null, user);
    });
  },

  // public

  'list': function list() {
    return this.userDao.find();
  },

  'create': function create(userData) {
    var dfd = Q.defer();

    async.waterfall([
        this._checkUsersExits.bind(this, userData),
        this._hash.bind(this),
        this._saveUser.bind(this)
      ],
      function (err, user) {
        if (err) {
          dfd.reject(err);
        } else {
          dfd.resolve(user);
        }
      });

      return dfd.promise;
    },

  'retrieve': function retrieve(username) {
    return this.userDao.findByUsername(username);
  },

  'update': function update(oldUsername, userData) {
    var dfd = Q.defer();

    async.waterfall([
        this._findUserByUsername.bind(this, oldUsername, userData),
        this._populateUser.bind(this),
        this._saveUser.bind(this)
      ],
      function (err, user) {
        if (err) {
          dfd.reject(err);
        } else {
          dfd.resolve(user);
        }
      });

    return dfd.promise;
  }
};

di.annotate(UserService, new di.Inject(UserDao));

module.exports = UserService;
