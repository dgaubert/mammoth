'use strict';

var di = require('di');
var _ = require('lodash');
var User = require('../models/user');

var UserDao = function UserDao(userModel) {
  this.userModel = userModel;
  _.bindAll(this, 'find', 'findByUsername');
};

UserDao.prototype = {

  // public

  'find': function find(callback) {
    this.userModel
      .find()
      .exec(callback);
  },

  'findByUsername': function findByUsername(username, callback) {
    this.userModel
      .findOne({
        username: username
      })
      .exec(callback);
  }
};

di.annotate(UserDao, new di.Inject(User));

module.exports = UserDao;
