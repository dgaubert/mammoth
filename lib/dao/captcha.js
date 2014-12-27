'use strict';

var di = require('di');
var _ = require('lodash');
var GridStoreBaseDao = require('./gridStoreBase');
var Captcha = require('../models/picture');

function CaptchaDao(captchaModel) {
  this.Model = captchaModel;
}

CaptchaDao.prototype = _.create(GridStoreBaseDao, {

  getMetadata: function (metadata) {
    return { 'value': metadata };
  },

  findByValue: function (value) {
    return this.find({ 'metadata.value': value });
  }

});

di.annotate(CaptchaDao, new di.Inject(Captcha));

module.exports = CaptchaDao;
