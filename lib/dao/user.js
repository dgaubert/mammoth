'use strict';

var di = require('di');
var Q = require('q');
var _ = require('lodash');
var User = require('../models/user');

var UserDao = function UserDao(userModel) {
  this.userModel = userModel;
  _.bindAll(this, 'find', 'findByUsername');
};

UserDao.prototype = {

  // public

  'find': function find() {
    return this.userModel.find().exec();
  },

  'findByUsername': function findByUsername(username) {
    var findOne = Q.nbind(this.userModel.findOne, this.userModel);

    return findOne(username)
      .then(function (user) {
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      });
  }
};

di.annotate(UserDao, new di.Inject(User));

module.exports = UserDao;
