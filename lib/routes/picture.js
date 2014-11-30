'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var PictureController = require('../controllers/article');

var PictureRoutes = function PictureRoutes(pictureController) {
    this.pictureController = _.bindAll(pictureController);
};

PictureRoutes.prototype = _.create(BaseRoutes, {
  get: function get() {
    return {
      '/blog': {
        '/pictures/:pictureName': {
          get: this.pictureController.retrieve
        },
        '/admin/articles/:slug/pictures': {
          '/new': {
            post: this.pictureController.create
          },
          '/:slug': {
            delete: this.pictureController.remove
          }
        }
      }
    };
  }
});

di.annotate(PictureRoutes, new di.Inject(PictureController));

module.exports = PictureRoutes;
