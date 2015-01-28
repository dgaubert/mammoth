'use strict';

var di = require('di');
var _ = require('lodash');
var BaseController = require('./base');
var PictureService = require('../services/picture');

function PictureController(pictureService) {
  this.service = pictureService;
  this.path = '/blog/admin/pictures/';
  this.propertyAsParamId = 'slug';
  this.template = 'blog/admin/picture';
  this.templateList = 'blog/admin/pictures';
  this.defaultTemplateContext = {
    title: 'Administración de imágenes',
    section: 'blog',
    entity: undefined,
    entities: undefined
  };
}

PictureController.prototype = _.create(BaseController, {

  constructor: PictureController,

  list: function (req, res, next) {
    var _this = this;
    var slug = req.params.slug;

    return this.service.list(slug)
      .then(function (pictures) {
        _this.renderTemplateList(res, {
          entities: pictures,
          slug: slug
        });
      })
      .fail(function (err) {
        next(err);
      });
  },

  show: function (req, res) {
    var slug = req.params.slug;
    this.renderTemplate(res, {
      slug: slug
    });
  },

  retrieve: function (req, res, next) {
    var name = req.params.pictureName;

    return this.service.retrieve(name)
      .then(function (picture) {
        res.set('Content-Type', 'image/png');
        res.send(new Buffer(picture, 'binary'));
      })
      .fail(function (err) {
        next(err);
      });
  },

  create: function (req, res, next) {
    var slug = req.params.slug;
    var path = req.files.picture.path;
    var name = req.files.picture.name;

    return this.service.create(name, path, slug)
      .then(function () {
        res.redirect('/blog/admin/articles/' + slug + '/pictures');
      })
      .fail(function (err) {
        next(err);
      });
  },

  remove: function (req, res, next) {
    var slug = req.params.slug;
    var name = req.params.pictureName;

    return this.service.remove(name)
      .then(function () {
        res.redirect('/blog/admin/articles/' + slug + '/pictures');
      })
      .fail(function (err) {
        next(err);
      });
  }
});

di.annotate(PictureController, new di.Inject(PictureService));

module.exports = PictureController;
