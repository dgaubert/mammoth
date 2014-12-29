'use strict';

var sanitize = require('sanitizer').sanitize;

var captchaMapper = {
  map: function map(captcha, data) {
    captcha.value = data.value;
    captcha.name = data.name;

    return captcha;
  },

  sanitizeData: function sanitizeData(data) {
    return {
      value: sanitize(data.captcha),
      name: sanitize(data.captchaName)
    };
  }
};

module.exports = captchaMapper;
