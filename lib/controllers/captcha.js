'use strict';

var di = require('di');
var _ = require('lodash');
var base = require('./base');
var CaptchaService = require('../services/captcha');

function CaptchaController(captchaService) {
  this.service = captchaService;
  this.path = '/blog/admin/captchas/';
  this.propertyAsParamId = 'captchaName';
  this.template = 'blog/admin/captcha';
  this.templateList = 'blog/admin/captchas';
  this.defaultTemplateContext = {
    title: 'Administración de captchas',
    section: 'blog',
    entity: undefined,
    entities: undefined
  };
}

CaptchaController.prototype = _.create(base, {

  constructor: CaptchaController,

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
    var creating = this.service.create(value, path);

    return this.redirectToList(creating, res, next);
  }
});

di.annotate(CaptchaController, new di.Inject(CaptchaService));

module.exports = CaptchaController;
