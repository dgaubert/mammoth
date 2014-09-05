/* jslint node: true */
'use strict';

var async = require('async');

var CaptchaService = function CaptchaService(captchaDao) {
  this.captchaDao = captchaDao;
};

// private

// generates the name for captcha (autoincremental)
CaptchaService.prototype._generateCaptchaName = function _generateCaptchaName(value, path, callback) {
  this.captchaDao.count(function countCaptchasDone(err, count) {
    if (err) return callback(err);

    var name = (count + 1) + '.png';
    callback(null, name, value, path);
  });
};

// public

CaptchaService.prototype.list = function list(callback) {
  this.captchaDao.find(callback);
};

CaptchaService.prototype.retrieve = function retrieve(name, callback) {
  this.captchaDao.read(name, callback);
};

CaptchaService.prototype.create = function create(value, path, callback) {
  async.waterfall([
      this._generateCaptchaName.bind(this, value, path),
      this.captchaDao.save,
    ], callback);
};

CaptchaService.prototype.remove = function remove(name, callback) {
  this.captchaDao.remove(name, callback);
};

module.exports = CaptchaService;
