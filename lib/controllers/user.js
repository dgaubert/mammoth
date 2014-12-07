'use strict';

var di = require('di');
var UserService = require('../services/user');
var userMapper = require('../mappers/user');

var UserController = function UserController(userService) {
  this.userService = userService;
};

UserController.prototype = {

  // public

  'list': function list(req, res, next) {
    this.userService.list()
      .then(function (users) {
        res.render('blog/admin/users', {
          title: 'Administración de usuarios',
          section:'blog',
          users: users
        });
      })
      .fail(function (err) {
        next(err);
      });
  },

  'show': function show(req, res) {
    res.render('blog/admin/user', {
      title: 'Nuevo usuario',
      section:'blog',
      user: undefined
    });
  },

  'create': function create(req, res, next) {
    var userData = userMapper.sanitizeData(req.body);

    this.userService.create(userData)
      .then(function (user) {
        res.redirect('/blog/admin/users/' + user.username);
      })
      .fail(function (err) {
        next(err);
      });
  },

  'retrieve': function retrieve(req, res, next) {
    var username = req.params.username;

    this.userService.retrieve(username)
      .then(function (user) {
        res.render('blog/admin/user', {
          title: 'Edición usuario',
          section:'blog',
          user: user
        });
      })
      .fail(function (err) {
        next(err);
      });
  },

  'update': function update(req, res, next) {
    var oldUsername = req.params.username;
    var userData = userMapper.sanitizeData(req.body);

    this.userService.update(oldUsername, userData)
      .then(function (user) {
        res.redirect('/blog/admin/users/' + user.username);
      })
      .fail(function (err) {
        next(err);
      });
  },

  'remove': function remove(req, res, next) {
    var username = req.params.username;

    this.userService.remove(username)
      .then(function (/*user*/) {
        res.redirect('/blog/admin/users');
      })
      .fail(function (err) {
        next(err);
      });
  }

};

di.annotate(UserController, new di.Inject(UserService));

module.exports = UserController;
