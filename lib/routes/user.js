'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var UserController = require('../controllers/user');

function UserRoutes(userController) {
  this.controller = _.bindAll(userController);
}

UserRoutes.prototype = _.create(BaseRoutes, {
  get: function () {
    return {
      '/blog/admin/users': {
        get: this.controller.list,
        '/new': {
          get: this.controller.show,
          post: this.controller.create
        },
        '/:username': {
          get: this.controller.retrieve,
          put: this.controller.update,
          delete: this.controller.remove
        }
      }
    };
  }
});

di.annotate(UserRoutes, new di.Inject(UserController));

module.exports = UserRoutes;
