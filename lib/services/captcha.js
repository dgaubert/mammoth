'use strict';

var di = require('di');
var _ = require('lodash');
var base = require('./base');
var CaptchaDao = require('../dao/captcha.js');

function CaptchaService(captchaDao) {
  this.dao = captchaDao;
}

CaptchaService.prototype = _.create(base, {

  constructor: CaptchaService,

  list: function () {
    return this.dao.find();
  },

  retrieve: function (name) {
    return this.dao.getFile(name);
  },

  create: function (value, path) {
    var _this = this;

    return this.dao.count()
      .then(function (count) {
        var name = (count + 1) + '.png';
        return _this.dao.saveFile(name, path, value);
      });
  },

  remove: function (name) {
    return this.dao.removeFile(name);
  }

});

di.annotate(CaptchaService, new di.Inject(CaptchaDao));

module.exports = CaptchaService;
