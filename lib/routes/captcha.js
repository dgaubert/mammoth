'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var CaptchaController = require('../controllers/article');

var CaptchaRoutes = function CaptchaRoutes(captchaController) {
    this.captchaController = _.bindAll(captchaController);
};

CaptchaRoutes.prototype = _.extend(BaseRoutes, {
  get: function get() {
    return {
      '/blog/admin/captcha': {
        get: this.captchaController.list,
        '/new': {
          get: this.captchaController.show,
          post: this.captchaController.create
        },
        '/:captchaName': {
          get: this.captchaController.retrive,
          delete: this.captchaController.remove
        }
      }
    };
  }
});

di.annotate(CaptchaRoutes, new di.Inject(CaptchaController));

module.exports = CaptchaRoutes;
