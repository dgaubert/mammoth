'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var CaptchaController = require('../controllers/captcha');

function CaptchaRoutes(captchaController) {
  this.controller = _.bindAll(captchaController);
}

CaptchaRoutes.prototype = _.create(BaseRoutes, {
  get: function () {
    return {
      '/blog/captcha/:captchaName': {
        get: this.controller.retrieve,
      },
      '/blog/admin/captcha': {
        get: this.controller.list,
        '/new': {
          get: this.controller.show,
          post: this.controller.create
        },
        '/:captchaName': {
          delete: this.controller.remove
        }
      }
    };
  }
});

di.annotate(CaptchaRoutes, new di.Inject(CaptchaController));

module.exports = CaptchaRoutes;
