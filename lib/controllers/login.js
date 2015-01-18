'use strict';

var di = require('di');
var _ = require('lodash');
var base = require('./base');
var LoginService = require('../services/login');

var LoginController = function LoginController(loginService) {
  this.service = loginService;
  this.template = 'blog/admin/login';
  this.defaultTemplateContext = {
    title: 'Autenticación',
    section: 'blog'
  };
};

LoginController.prototype = _.create(base, {

  constructor: LoginController,

  'check': function check(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    this.service.check(username, password)
      .then(function (user) {
        req.session.regenerate(function () {
          req.session.user = user;
          res.redirect('/blog/admin');
        });
      })
      .fail(function () {
        res.redirect('/blog/login');
      });
  },

  'logout': function logout(req, res) {
    req.session.destroy(function done() {
      res.redirect('/blog');
    });
  },
});

di.annotate(LoginController, new di.Inject(LoginService));

module.exports = LoginController;
