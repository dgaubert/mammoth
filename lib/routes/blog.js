'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var BlogController = require('../controllers/blog');

function BlogRoutes(blogController) {
  this.controller = _.bindAll(blogController);
}

BlogRoutes.prototype = _.create(BaseRoutes, {
  get: function () {
    return {
      '/blog': {
        get: this.controller.list,
        '/category/:category': {
          get: this.controller.list,
        },
        '/tag/:tag': {
          get: this.controller.list,
        },
        '/:slug': {
          get: this.controller.retrieve
        }
      }
    };
  }
});

di.annotate(BlogRoutes, new di.Inject(BlogController));

module.exports = BlogRoutes;
