function pictureController(PictureService) {

  function getPicture(req, res, next) {
    var name = req.params.pictureName ? req.params.pictureName[0] : null;

    PictureService.read(name, function readDone(err, picture) {
      if (err) {
        return next(err);
      }
      res.set('Content-Type', 'image/png');
      res.send(new Buffer(picture, 'binary'));
    });
  }

  function newPicture(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;
    var path = req.files.picture.path;
    var name = req.files.picture.name;

    PictureService.save(name, path, slug, function saveDone(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/blog/admin/articles/' + slug);
    });

  }

  function deletePicture(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;
    var name = req.params.pictureName ? req.params.pictureName[0] : null;

    PictureService.remove(name, function removeDone(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/blog/admin/articles/' + slug);
    });
  }

  // public
  return {
    'getPicture': getPicture,
    'newPicture': newPicture,
    'deletePicture': deletePicture
  };
}

module.exports = pictureController;
