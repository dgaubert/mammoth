'use strict';

var _ = require('lodash');
var BaseMapper = require('./base');

function CaptchaMapper() {}

CaptchaMapper.prototype = _.create(BaseMapper, {

  constructor: CaptchaMapper,

  map: function (input) {
    var data = {
      filename: input.captchaFilename,
      value: input.captchaValue
    };

    return this.sanitize(data);
  }

});

module.exports = CaptchaMapper;
