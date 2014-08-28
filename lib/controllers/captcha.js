/* jslint node: true */
'use strict';

var async = require('async');

function CaptchaController(CaptchaService) {

  // public

  function list(callback) {
    CaptchaService.find(callback);
  }

  function retrieve(name, callback) {
    CaptchaService.read(name, callback);
  }

  function create(value, path, callback) {
    var createCaptchaTasks = [

      // count captchas in order to obtain the last name (incremental)
      function countCaptchasTask(callback) {
        CaptchaService.count(function countCaptchasTaskDone(err, count) {
          if (err) {
            return callback(err);
          }

          var name = (count + 1) + '.png';
          callback(null, name);
        });
      },

      // save captcha
      function saveCaptchaTask(name, callback) {
        CaptchaService.save(name, path, value, function saveCaptchaTaskDone(err) {
          if (err) {
            return callback(err);
          }

          callback(null);
        });
      }
    ];

    async.waterfall(createCaptchaTasks, callback);
  }

  function remove(name, callback) {
    CaptchaService.remove(name, callback);
  }

  // expose

  return {
    'list': list,
    'retrieve': retrieve,
    'create': create,
    'remove': remove
  };
}

module.exports = CaptchaController;
