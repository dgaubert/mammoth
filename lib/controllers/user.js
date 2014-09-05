/* jslint node: true */
'use strict';

var sanitize = require('sanitizer').sanitize;

var UserController = function UserController(userService) {
  this.userService = userService;
};

// public

UserController.prototype.list = function list(req, res, next) {
  this.userService.list(function listDone(err, users) {
    if (err) return next(err);

    res.render('blog/admin/users', {
      title: 'Administración de usuarios',
      section:'blog',
      users: users
    });
  });
};

UserController.prototype.show = function show(req, res, next) {
  res.render('blog/admin/user', {
    title: 'Nuevo usuario',
    section:'blog',
    user: undefined
  });
};

UserController.prototype.create = function create(req, res, next) {
  var username = sanitize(req.body.username);
  var password = sanitize(req.body.password);

  this.userService.create(username, password, function createUserDone(err, user) {
    if (err) return next(err);

    res.redirect('/blog/admin/users/' + user.username);
  });
};


UserController.prototype.retrieve = function retrieve(req, res, next) {
  var username = req.params.username ? req.params.username[0] : null;

  this.userService.retrieve(username, function retrieveUserDone(err, user) {
    if (err) return next(err);

    res.render('blog/admin/user', {
      title: 'Edición usuario',
      section:'blog',
      user: user
    });
  });
};

UserController.prototype.update = function update(req, res, next) {
  var oldUsername = req.params.username ? req.params.username[0] : null;
  var userData = {
    username: sanitize(req.body.username),
    password: sanitize(req.body.password)
  };

  this.userService.update(oldUsername, userData, function (err, user) {
    if (err) return next(err);

    res.redirect('/blog/admin/users/' + user.username);
  });
};

module.exports = UserController;
