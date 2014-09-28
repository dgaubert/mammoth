/* jslint node: true */
'use strict';

var PictureController = function PictureController(pictureService) {
  this.pictureService = pictureService;
};

PictureController.prototype = {

  // public

  'retrieve': function retrieve(req, res, next) {
    var name = req.params.pictureName ? req.params.pictureName[0] : null;

    this.pictureService.retrieve(name, function retrievePictureDone(err, picture) {
      if (err) return next(err);

      res.set('Content-Type', 'image/png');
      res.send(new Buffer(picture, 'binary'));
    });
  },

  'create': function create(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;
    var path = req.files.picture.path;
    var name = req.files.picture.name;

    this.pictureService.create(name, path, slug, function createPictureDone(err) {
      if (err) return next(err);

      res.redirect('/blog/admin/articles/' + slug);
    });
  },

  'remove': function remove(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;
    var name = req.params.pictureName ? req.params.pictureName[0] : null;

    this.pictureService.remove(name, function removePictureDone(err) {
      if (err) return next(err);

      res.redirect('/blog/admin/articles/' + slug);
    });
  }
};

module.exports = PictureController;
