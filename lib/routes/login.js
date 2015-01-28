'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var LoginController = require('../controllers/login');

function LoginRoutes(loginController) {
  this.controller = _.bindAll(loginController);
}

LoginRoutes.prototype = _.create(BaseRoutes, {

  constructor: LoginRoutes,

  get: function () {
    return {
      '/blog': {
        '/login': {
          get: this.controller.show,
          post: this.controller.check,
        },
        '/logout': {
          get: this.controller.logout
        }
      }
    };
  }
});

di.annotate(LoginRoutes, new di.Inject(LoginController));

module.exports = LoginRoutes;
