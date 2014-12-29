'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var CommentController = require('../controllers/comment');

function CommentRoutes(commentController) {
  this.controller = _.bindAll(commentController);
}

CommentRoutes.prototype = _.create(BaseRoutes, {
  get: function () {
    return {
      '/blog': {
        '/:slug/comment': {
          post: this.controller.create
        },
        '/admin/articles/:slug/comments': {
          get: this.controller.list,
          '/:commentId': {
            delete: this.controller.remove
          }
        }
      }
    };
  }
});

di.annotate(CommentRoutes, new di.Inject(CommentController));

module.exports = CommentRoutes;
