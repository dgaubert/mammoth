'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var UserController = require('../controllers/user');

var UserRoutes = function UserRoutes(userController) {
  this.userController = _.bindAll(userController);
};

UserRoutes.prototype = _.create(BaseRoutes, {
  get: function get() {
    return {
      '/blog/admin/users': {
        get: this.userController.list,
        '/new': {
          get: this.userController.show,
          post: this.userController.create
        },
        '/:username': {
          get: this.userController.retrieve,
          put: this.userController.update
        }
      }
    };
  }
});

di.annotate(UserRoutes, new di.Inject(UserController));

module.exports = UserRoutes;
