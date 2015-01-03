'use strict';

var di = require('di');
var PictureService = require('../services/picture');

function PictureController(pictureService) {
  this.service = pictureService;
}

PictureController.prototype = {

  list: function (req, res, next) {
    var slug = req.params.slug;

    this.service.list(slug)
      .then(function (pictures) {
        res.render('blog/admin/pictures', {
          title: 'Administración de imágenes',
          section:'blog',
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

    res.render('blog/admin/picture', {
      title: 'Nueva imagen',
      section:'blog',
      picture: undefined,
      slug: slug
    });
  },

  retrieve: function (req, res, next) {
    var name = req.params.pictureName;

    this.service.retrieve(name)
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

    this.service.create(name, path, slug)
      .then(function () {
        res.redirect('/blog/admin/articles/' + slug  + '/pictures');
      })
      .fail(function (err) {
        next(err);
      });
  },

  remove: function (req, res, next) {
    var slug = req.params.slug;
    var name = req.params.pictureName;

    this.service.remove(name)
      .then(function () {
        res.redirect('/blog/admin/articles/' + slug + '/pictures');
      })
      .fail(function (err) {
        next(err);
      });
  }
};

di.annotate(PictureController, new di.Inject(PictureService));

module.exports = PictureController;
