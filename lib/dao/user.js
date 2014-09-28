/* jslint node: true */
'use strict';

var _ = require('lodash');

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

module.exports = UserDao;
