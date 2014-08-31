/* jslint node: true */
'use strict';

var sanitize = require('sanitizer').sanitize;

module.exports = function userRoute(userService) {

  // public

  function list(req, res, next) {
    userService.list(function listDone(err, users) {
      if (err) return next(err);

      res.render('blog/admin/users', {
        title: 'Administración de usuarios',
        section:'blog',
        users: users
      });
    });
  }

  function show(req, res) {
    res.render('blog/admin/user', {
      title: 'Nuevo usuario',
      section:'blog',
      user: undefined
    });
  }

  function create(req, res, next) {
    var username = sanitize(req.body.username);
    var password = sanitize(req.body.password);

    userService.create(username, password, function createUserDone(err, user) {
      if (err) return next(err);

      res.redirect('/blog/admin/users/' + user.username);
    });
  }

  function retrieve(req, res, next) {
    var username = req.params.username ? req.params.username[0] : null;

    userService.retrieve(username, function retrieveUserDone(err, user) {
      if (err) return next(err);

      res.render('blog/admin/user', {
        title: 'Edición usuario',
        section:'blog',
        user: user
      });
    });
  }

  function update(req, res, next) {
    var oldUsername = req.params.username ? req.params.username[0] : null;
    var userData = {
      username: sanitize(req.body.username),
      password: sanitize(req.body.password)
    };

    userService.update(oldUsername, userData, function (err, user) {
      if (err) return next(err);

      res.redirect('/blog/admin/users/' + user.username);
    });
  }

  // expose API
  return {
    'create': create,
    'list': list,
    'show': show,
    'retrieve': retrieve,
    'update': update
  };
};
