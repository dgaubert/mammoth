'use strict';

var di = require('di');
var Q = require('q');
var User = require('../models/user');
var userMapper = require('../mappers/user');
var pwd = require('pwd');
var UserDao = require('../dao/user.js');

var UserService = function UserService(userDao) {
  this.userDao = userDao;
};

UserService.prototype = {

  // public

  'list': function list() {
    return this.userDao.find();
  },

  'create': function create(userData) {
    var _this = this;

    return this.userDao.checkIfNotExits(userData.username)
      .then(function () {
        var hashPassword = Q.nbind(pwd.hash, pwd);
        return hashPassword(userData.password);
      })
      .then(function (result /* [salt, hash]*/) {
        var user = userMapper.map(new User(), userData, result[0], result[1]);
        return _this.userDao.save(user);
      });
  },

  'retrieve': function retrieve(username) {
    return this.userDao.findByUsername(username);
  },

  'update': function update(oldUsername, userData) {
    var _this = this;

    return this.userDao.findByUsername(oldUsername)
      .then(function (user) {
        return oldUsername !== userData.username ?
          [user, _this.userDao.checkIfNotExits(userData.username)] :
          [user];
      })
      .spread(function (user) {
        var hashPassword = Q.nbind(pwd.hash, pwd);
        return [user, hashPassword(userData.password)];
      })
      .spread(function (user, result /* [salt, hash]*/) {
        user = userMapper.map(user, userData, result[0], result[1]);
        return _this.userDao.save(user);
      });
  },

  'remove': function remove(username) {
    return this.userDao.findByUsernameAndRemove(username);
  }
};

di.annotate(UserService, new di.Inject(UserDao));

module.exports = UserService;
