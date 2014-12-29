'use strict';

var di = require('di');
var CaptchaService = require('../services/captcha');

function CaptchaController(captchaService) {
  this.service = captchaService;
}

CaptchaController.prototype = {

  list: function (req, res, next) {
    this.service.list()
      .then(function (captchas) {
        res.render('blog/admin/captchas', {
          title: 'Administración de captchas',
          section:'blog',
          captchas: captchas
        });
      })
      .fail(function (err) {
        next(err);
      });
  },

  show: function (req, res) {
    res.render('blog/admin/captcha', {
      title: 'Nuevo captcha',
      section:'blog',
      captcha: undefined
    });
  },

  retrieve: function (req, res, next) {
    var name = req.params.captchaName;

    this.service.retrieve(name)
      .then(function (captcha) {
        res.set('Content-Type', 'image/png');
        res.send(new Buffer(captcha, 'binary'));
      })
      .fail(function (err) {
        next(err);
      });
    },

  create: function (req, res, next) {
    var value = req.body.value;
    var path = req.files.captcha.path;

    this.service.create(value, path)
      .then(function () {
        res.redirect('/blog/admin/captcha');
      })
      .fail(function (err) {
        next(err);
      });
  },

  remove: function (req, res, next) {
    var name = req.params.captchaName;

    this.service.remove(name)
      .then(function () {
        res.redirect('/blog/admin/captcha');
      })
      .fail(function (err) {
        next(err);
      });
  }
};

di.annotate(CaptchaController, new di.Inject(CaptchaService));

module.exports = CaptchaController;
