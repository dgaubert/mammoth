'use strict';

var userMapper = require('../mappers/user');

var UserController = function UserController(userService) {
  this.userService = userService;
};

UserController.prototype = {
  // public

  'list': function list(req, res, next) {
    this.userService.list(function listDone(err, users) {
      if (err) return next(err);

      res.render('blog/admin/users', {
        title: 'Administración de usuarios',
        section:'blog',
        users: users
      });
    });
  },

  'show': function show(req, res, next) {
    res.render('blog/admin/user', {
      title: 'Nuevo usuario',
      section:'blog',
      user: undefined
    });
  },

  'create': function create(req, res, next) {
    var userData = userMapper.sanitizeData(req.body);

    this.userService.create(userData, function createUserDone(err, user) {
      if (err) return next(err);

      res.redirect('/blog/admin/users/' + user.username);
    });
  },

  'retrieve': function retrieve(req, res, next) {
    var username = req.params.username ? req.params.username[0] : null;

    this.userService.retrieve(username, function retrieveUserDone(err, user) {
      if (err) return next(err);

      res.render('blog/admin/user', {
        title: 'Edición usuario',
        section:'blog',
        user: user
      });
    });
  },

  'update': function update(req, res, next) {
    var oldUsername = req.params.username ? req.params.username[0] : null;
    var userData = userMapper.sanitizeData(req.body);

    this.userService.update(oldUsername, userData, function (err, user) {
      if (err) return next(err);

      res.redirect('/blog/admin/users/' + user.username);
    });
  }
};

module.exports = UserController;
