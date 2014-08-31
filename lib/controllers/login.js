/* jslint node: true */
'use strict';

module.exports = function loginController(loginService) {

  // public

  function check(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    loginService.check(username, password, function checkLoginDone(err, user) {
      if (err) return res.redirect('/blog/login');

      // regenerate session
      req.session.regenerate(function () {
        req.session.user = user;
        res.redirect('/blog/admin');
      });
    });
  }

  function logout(req, res, next) {
    req.session.destroy(function done() {
      res.redirect('/blog');
    });
  }

  function show(req, res, next) {
    res.render('blog/admin/login', {
      title: 'Autenticación',
      section:'blog'
    });
  }

  // expose

  return {
    'check': check,
    'logout': logout,
    'show': show
  };
};
