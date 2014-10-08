'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema definition
var captchaSchema = new Schema({
  filename: String,
  metadata: Object
}, {
  collection: 'captchas.files'
});

module.exports = mongoose.model('Captcha', captchaSchema);
