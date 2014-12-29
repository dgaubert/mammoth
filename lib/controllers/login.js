'use strict';

var di = require('di');
var LoginService = require('../services/login');

var LoginController = function LoginController(loginService) {
  this.service = loginService;
};

LoginController.prototype = {

  // public

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

  'show': function show(req, res) {
    res.render('blog/admin/login', {
      title: 'Autenticación',
      section:'blog'
    });
  }
};

di.annotate(LoginController, new di.Inject(LoginService));

module.exports = LoginController;
