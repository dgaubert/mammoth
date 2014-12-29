'use strict';

var di = require('di');
var _ = require('lodash');
var GridStoreBaseDao = require('./gridStoreBase');
var Captcha = require('../models/captcha');

function CaptchaDao(captchaModel) {
  this.Model = captchaModel;
}

CaptchaDao.prototype = _.create(GridStoreBaseDao, {

  getRoot: function () {
    return 'captchas';
  },

  getMetadata: function (metadata) {
    return { 'value': metadata };
  },

  findByValue: function (value) {
    return this.find({ 'metadata.value': value })
      .then(function (captchas) {
        if (!captchas) {
          throw new Error('Captcha not found');
        }
        return captchas[0];
      });
  }

});

di.annotate(CaptchaDao, new di.Inject(Captcha));

module.exports = CaptchaDao;
