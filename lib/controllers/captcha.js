/* jslint node: true */
'use strict';

var CaptchaController = function (captchaService) {
  this.captchaService = captchaService;
};

// public

CaptchaController.prototype.list = function (req, res, next) {
  this.captchaService.list(function listCaptchasDone(err, captchas) {
    if (err) return next(err);

    res.render('blog/admin/captchas', {
      title: 'Administración de captchas',
      section:'blog',
      captchas: captchas
    });
  });
};

CaptchaController.prototype.show = function (req, res, next) {
  res.render('blog/admin/captcha', {
    title: 'Nuevo captcha',
    section:'blog',
    captcha: undefined
  });
};

CaptchaController.prototype.retrieve = function (req, res, next) {
  var name = req.params.captchaName;

  this.captchaService.retrieve(name, function retrieveCaptchaDone(err, captcha) {
    if (err) return next(err);

    res.set('Content-Type', 'image/png');
    res.send(new Buffer(captcha, 'binary'));
  });
};

CaptchaController.prototype.create = function (req, res, next) {
  var value = req.body.value;
  var path = req.files.captcha.path;

  this.captchaService.create(value, path, function createCaptchaDone(err) {
    if (err) return next(err);

    res.redirect('/blog/admin/captcha');
  });
};

CaptchaController.prototype.remove = function (req, res, next) {
  var name = req.params.captchaName;

  this.captchaService.remove(name, function removeCaptchaDone(err) {
    if (err) return next(err);

    res.redirect('/blog/admin/captcha');
  });
};

module.exports = CaptchaController;
