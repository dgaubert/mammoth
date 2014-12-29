'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var PictureController = require('../controllers/picture');

function PictureRoutes(pictureController) {
  this.controller = _.bindAll(pictureController);
}

PictureRoutes.prototype = _.create(BaseRoutes, {
  get: function () {
    return {
      '/blog': {
        '/pictures/:pictureName': {
          get: this.controller.retrieve
        },
        '/admin/articles/:slug/pictures': {
          '/new': {
            post: this.controller.create
          },
          '/:pictureName': {
            delete: this.controller.remove
          }
        }
      }
    };
  }
});

di.annotate(PictureRoutes, new di.Inject(PictureController));

module.exports = PictureRoutes;
