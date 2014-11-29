'use strict';

var di = require('di');
var CaptchaService = require('../services/captcha');

var CaptchaController = function CaptchaController(captchaService) {
  this.captchaService = captchaService;
};

CaptchaController.prototype = {

  // public

  'list': function list(req, res, next) {
    this.captchaService.list(function listCaptchasDone(err, captchas) {
      if (err) {
        return next(err);
      }

      res.render('blog/admin/captchas', {
        title: 'Administración de captchas',
        section:'blog',
        captchas: captchas
      });
    });
  },

  'show': function show(req, res) {
    res.render('blog/admin/captcha', {
      title: 'Nuevo captcha',
      section:'blog',
      captcha: undefined
    });
  },

  'retrieve': function retrieve(req, res, next) {
    var name = req.params.captchaName;

    this.captchaService.retrieve(name, function retrieveCaptchaDone(err, captcha) {
      if (err) {
        return next(err);
      }

      res.set('Content-Type', 'image/png');
      res.send(new Buffer(captcha, 'binary'));
    });
  },

  'create': function create(req, res, next) {
    var value = req.body.value;
    var path = req.files.captcha.path;

    this.captchaService.create(value, path, function createCaptchaDone(err) {
      if (err) {
        return next(err);
      }

      res.redirect('/blog/admin/captcha');
    });
  },

  'remove': function remove(req, res, next) {
    var name = req.params.captchaName;

    this.captchaService.remove(name, function removeCaptchaDone(err) {
      if (err) {
      return next(err);
    }

      res.redirect('/blog/admin/captcha');
    });
  }
};

di.annotate(CaptchaController, new di.Inject(CaptchaService));

module.exports = CaptchaController;
