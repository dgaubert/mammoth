'use strict';

var di = require('di');
var _ = require('lodash');
var base = require('./base');
var Q = require('q');
var pwd = require('pwd');
var UserDao = require('../dao/user.js');

function LoginService(userDao) {
  this.dao = userDao;
}

LoginService.prototype = _.create(base, {

  constructor: LoginService,

  check: function (username, password) {
    return this.dao.findByUsername(username)
      .then(function (user) {
        var hashPassword = Q.nbind(pwd.hash, pwd);
        return [user, hashPassword(password, user.salt)];
      })
      .spread(function (user, hash) {
        if (hash.toString('utf-8') !== user.hash) {
          throw new Error('Bad password');
        }
        return hash;
      });
  }

});

di.annotate(LoginService, new di.Inject(UserDao));

module.exports = LoginService;
