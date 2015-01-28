'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var AdminController = require('../controllers/admin');

function AdminRoutes(adminController) {
  this.controller = _.bindAll(adminController);
}

AdminRoutes.prototype = _.create(BaseRoutes, {

  constructor: AdminRoutes,

  get: function () {
    return {
      '/blog/admin': {
        get: this.controller.show
      }
    };
  }
});

di.annotate(AdminRoutes, new di.Inject(AdminController));

module.exports = AdminRoutes;
