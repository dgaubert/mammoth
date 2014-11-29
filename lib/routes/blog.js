'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var BlogController = require('../controllers/blog');

var BlogRoutes = function BlogRoutes(blogController) {
    this.blogController = _.bindAll(blogController);
};

BlogRoutes.prototype = _.extend(BaseRoutes, {
  get: function get() {
    return {
      '/blog': {
        get: this.blogController.list,
        ':page': {
          get: this.blogController.list
        },
        '/category/:category': {
          get: this.blogController.list,
          '/:page':  {
            get: this.blogController.list
          }
        },
        '/tag/:tag': {
          get: this.blogController.list,
          '/:page': {
            get: this.blogController.list
          }
        },
        '/:slug': {
          get: this.blogController.retrieve
        }
      }
    };
  }
});

di.annotate(BlogRoutes, new di.Inject(BlogController));

module.exports = BlogRoutes;
