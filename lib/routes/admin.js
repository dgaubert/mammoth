'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var AdminController = require('../controllers/admin');

var AdminRoutes = function AdminRoutes(adminController) {
    this.adminController = _.bindAll(adminController);
};

AdminRoutes.prototype = _.extend(BaseRoutes, {
    get: function get() {
      return {
        '/blog/admin/': {
          get: this.articleController.show
        }
      };
    }
});

di.annotate(AdminRoutes, new di.Inject(AdminController));

module.exports = AdminRoutes;
