'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var ArticleController = require('../controllers/article');

function ArticleRoutes(articleController) {
  this.controller = _.bindAll(articleController);
}

ArticleRoutes.prototype = _.create(BaseRoutes, {

  constructor: ArticleRoutes,

  get: function () {
    return {
      '/blog/admin/articles': {
        get: this.controller.list,
        '/new': {
          get: this.controller.show,
          post: this.controller.create
        },
        '/:slug': {
          get: this.controller.retrieve,
          put: this.controller.update
        }
      }
    };
  }
});

di.annotate(ArticleRoutes, new di.Inject(ArticleController));

module.exports = ArticleRoutes;
