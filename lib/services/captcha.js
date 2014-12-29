'use strict';

var di = require('di');
var CaptchaDao = require('../dao/captcha.js');

function CaptchaService(captchaDao) {
  this.dao = captchaDao;
}

CaptchaService.prototype = {

  list: function () {
    return this.dao.find();
  },

  retrieve: function (name) {
    return this.dao.getFile(name);
  },

  create: function (value, path) {
    return this.dao.count()
      .then(function (count) {
        var name = (count + 1) + '.png';
        return this.dao.saveFile(path, name, value);
      });
  },

  remove: function (name) {
    return this.dao.removeFile(name);
  }
};

di.annotate(CaptchaService, new di.Inject(CaptchaDao));

module.exports = CaptchaService;
