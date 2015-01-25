'use strict';

var di = require('di');
var _ = require('lodash');
var base = require('./base.image');
var CaptchaDao = require('../dao/captcha.js');

function CaptchaService(captchaDao) {
  this.dao = captchaDao;
}

CaptchaService.prototype = _.create(base, {

  constructor: CaptchaService,

  create: function (value, path) {
    var _this = this;

    return this.dao.count()
      .then(function (count) {
        var name = (count + 1) + '.png';
        return _this.dao.saveFile(name, path, value);
      });
  }

});

di.annotate(CaptchaService, new di.Inject(CaptchaDao));

module.exports = CaptchaService;
