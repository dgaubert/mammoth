'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var HomeController = require('../controllers/home');

function HomeRoutes(homeController) {
  this.controller = _.bindAll(homeController);
}

HomeRoutes.prototype = _.create(BaseRoutes, {
  get: function () {
    return {
      '/': {
        get: this.controller.show
      }
    };
  }
});

di.annotate(HomeRoutes, new di.Inject(HomeController));

module.exports = HomeRoutes;
