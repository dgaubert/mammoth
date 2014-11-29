'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var CommentController = require('../controllers/comment');

var CommentRoutes = function CommentRoutes(commentController) {
    this.commentController = _.bindAll(commentController);
};

CommentRoutes.prototype = _.extend(BaseRoutes, {
  get: function get() {
    return {
      '/blog': {
        '/:slug/comment': {
          post: this.commentController.create
        },
        '/admin/articles/:slug/comments': {
          get: this.commentController.list,
          '/:commentId': {
            delete: this.commentController.remove
          }
        }
      }
    };
  }
});

di.annotate(CommentRoutes, new di.Inject(CommentController));

module.exports = CommentRoutes;
