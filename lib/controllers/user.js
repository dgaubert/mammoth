'use strict';

var di = require('di');
var _ = require('lodash');
var base = require('./base');
var UserService = require('../services/user');
var UserMapper = require('../mappers/user');

function UserController(userService, userMapper) {
  this.service = userService;
  this.mapper = userMapper;
  this.path = '/blog/admin/users/';
  this.propertyAsParamId = 'username';
  this.template = 'blog/admin/user';
  this.templateList = 'blog/admin/users';
  this.defaultTemplateContext = {
    title: 'Administración de usuario',
    section: 'blog',
    entity: undefined,
    entities: undefined
  };
}

UserController.prototype = _.extend(base, {

  update: function (req, res, next) {
    var oldUsername = req.params.username;
    var userData = this.mapper.sanitizeData(req.body);
    var updating = this.service.update(oldUsername, userData);

    this.redirectToEntity(updating, res, next);
  }

});

di.annotate(UserController, new di.Inject(UserService, UserMapper));

module.exports = UserController;
