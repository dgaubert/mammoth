/* jslint node: true */
'use strict';

var LoginController = function LoginController(loginService) {
  this.loginService = loginService;
};

// public

LoginController.prototype.check = function check(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  this.loginService.check(username, password, function checkLoginDone(err, user) {
    if (err) return res.redirect('/blog/login');

    // regenerate session
    req.session.regenerate(function () {
      req.session.user = user;
      res.redirect('/blog/admin');
    });
  });
};

LoginController.prototype.logout = function logout(req, res, next) {
  req.session.destroy(function done() {
    res.redirect('/blog');
  });
};

LoginController.prototype.show = function show(req, res, next) {
  res.render('blog/admin/login', {
    title: 'Autenticación',
    section:'blog'
  });
};

module.exports = LoginController;
