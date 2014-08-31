/* jslint node: true */
'use strict';

var async = require('async');

module.exports = function captchaService(captchaDao) {

  // private

  // generates the name for captcha (autoincremental)
  function generateCaptchaName(value, path, callback) {
    captchaDao.count(function countCaptchasDone(err, count) {
      if (err) return callback(err);

      var name = (count + 1) + '.png';
      callback(null, name, value, path);
    });
  }

  // public

  function list(callback) {
    captchaDao.find(callback);
  }

  function retrieve(name, callback) {
    captchaDao.read(name, callback);
  }

  function create(value, path, callback) {
    async.waterfall([
        generateCaptchaName.bind(null, value, path),
        captchaDao.save,
      ], callback);
  }

  function remove(name, callback) {
    captchaDao.remove(name, callback);
  }

  // expose

  return {
    'list': list,
    'retrieve': retrieve,
    'create': create,
    'remove': remove
  };
};
