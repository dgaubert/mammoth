'use strict';

var di = require('di');
var Q = require('q');
var _ = require('lodash');
var pwd = require('pwd');
var base = require('./base');
var UserDao = require('../dao/user.js');

function UserService(userDao) {
  this.dao = userDao;
}

UserService.prototype = _.create(base, {

  constructor: UserService,

  create: function (userData) {
    var _this = this;

    return this.dao.checkIfNotExits(userData.username)
      .then(function () {
        var hashPassword = Q.nbind(pwd.hash, pwd);
        return hashPassword(userData.password);
      })
      .then(function (result /* [salt, hash]*/ ) {
        var data = {
          username: userData.username,
          salt: result[0],
          hash: result[1]
        };
        return _this.dao.create(data);
      });
  },

  retrieve: function (username) {
    return this.dao.findByUsername(username);
  },

  update: function (oldUsername, userData) {
    var _this = this;

    return this.dao.findByUsername(oldUsername)
      .then(function (user) {
        return oldUsername !== userData.username ? [user, _this.dao.checkIfNotExits(userData.username)] : [user];
      })
      .spread(function (user) {
        var hashPassword = Q.nbind(pwd.hash, pwd);
        return [user, hashPassword(userData.password)];
      })
      .spread(function (user, result /* [salt, hash]*/ ) {
        var data = {
          username: userData.username,
          salt: result[0],
          hash: result[1]
        };
        var updatedUser = _.assign(user, data);
        return _this.dao.save(updatedUser);
      });
  },

  remove: function (username) {
    return this.dao.findByUsernameAndRemove(username);
  }

});

di.annotate(UserService, new di.Inject(UserDao));

module.exports = UserService;
