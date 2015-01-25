'use strict';

var base = require('./base');
var _ = require('lodash');

function CaptchaMapper() {}

CaptchaMapper.prototype = _.extend(base, {});

module.exports = CaptchaMapper;
