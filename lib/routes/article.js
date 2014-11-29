'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var ArticleController = require('../controllers/article');

var ArticleRoutes = function ArticleRoutes(articleController) {
    this.articleController = _.bindAll(articleController);
};

ArticleRoutes.prototype = _.extend(BaseRoutes, {
  get: function get() {
    return {
      '/blog/admin/articles': {
        get: this.articleController.list,
        '/new': {
          get: this.articleController.show,
          post: this.articleController.create
        },
        '/:slug': {
          get: this.articleController.retrieve,
          put: this.articleController.update
        }
      }
    };
  }
});

di.annotate(ArticleRoutes, new di.Inject(ArticleController));

module.exports = ArticleRoutes;
