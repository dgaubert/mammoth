'use strict';

var di = require('di');
var _ = require('lodash');
var BaseDao = require('./base');
var User = require('../models/user');

function UserDao(userModel) {
  this.Model = userModel;
}

UserDao.prototype = _.create(BaseDao, {

  findByUsername: function (username) {
    return this.findOne({ 'username': username })
      .then(function (user) {
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      });
  },

  checkIfNotExits: function (username) {
    return this.findOne({ 'username': username })
      .then(function (user) {
        if (user) {
          throw new Error('User already exists');
        }
      });
  },

  findByUsernameAndRemove: function (username) {
    var _this = this;

    return this.findByUsername(username)
      .then(function (user) {
        return _this.remove(user);
      });
  }

});

di.annotate(UserDao, new di.Inject(User));

module.exports = UserDao;
