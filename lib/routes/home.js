'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var HomeController = require('../controllers/home');

var HomeRoutes = function HomeRoutes(homeController) {
    this.homeController = _.bindAll(homeController);
};

HomeRoutes.prototype = _.extend(BaseRoutes, {
    get: function get() {
      return {
        '/': {
          get: this.homeController.show
        }
      };
    }
});

di.annotate(HomeRoutes, new di.Inject(HomeController));

module.exports = HomeRoutes;
