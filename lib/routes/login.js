'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var LoginController = require('../controllers/login');

var LoginRoutes = function LoginRoutes(loginController) {
    this.loginController = _.bindAll(loginController);
};

LoginRoutes.prototype = _.extend(BaseRoutes, {
    get: function get() {
      return {
        '/blog': {
          'login': {
            get: this.loginController.show,
            post: this.loginController.check,
          },
          '/logout': {
            get: this.loginController.logout
          }
        }
      };
    }
});

di.annotate(LoginRoutes, new di.Inject(LoginController));

module.exports = LoginRoutes;
