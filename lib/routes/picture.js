/* jslint node: true */
'use strict';

function PictureRoute(PictureController) {

  // public

  function retrieve(req, res, next) {
    var name = req.params.pictureName ? req.params.pictureName[0] : null;

    PictureController.retrieve(name, function retrievePictureDone(err, picture) {
      if (err) {
        return next(err);
      }
      res.set('Content-Type', 'image/png');
      res.send(new Buffer(picture, 'binary'));
    });
  }

  function create(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;
    var path = req.files.picture.path;
    var name = req.files.picture.name;

    PictureController.create(name, path, slug, function createPictureDone(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/blog/admin/articles/' + slug);
    });

  }

  function remove(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;
    var name = req.params.pictureName ? req.params.pictureName[0] : null;

    PictureController.remove(name, function removePictureDone(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/blog/admin/articles/' + slug);
    });
  }

  // expose

  return {
    'retrieve': retrieve,
    'create': create,
    'remove': remove
  };
}

module.exports = PictureRoute;
