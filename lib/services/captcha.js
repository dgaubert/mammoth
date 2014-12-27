'use strict';

var di = require('di');
var CaptchaDao = require('../dao/captcha.js');

function CaptchaService(captchaDao) {
  this.dao = captchaDao;
}

CaptchaService.prototype = {

  list: function (callback) {
    this.dao.find(callback);
  },

  retrieve: function (name, callback) {
    this.dao.read(name, callback);
  },

  create: function (value, path) {
    return this.dao.count()
      .then(function (count) {
        var name = (count + 1) + '.png';
        return this.dao.saveFile(path, name, value);
      });
  },

  remove: function (name, callback) {
    this.dao.remove(name, callback);
  }
};

di.annotate(CaptchaService, new di.Inject(CaptchaDao));

module.exports = CaptchaService;
