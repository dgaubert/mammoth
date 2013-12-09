/**
 * 
 */
module.exports = function (PictureService) {

  /**
   *
   */
  this.getPicture = function (req, res, next) {
    var name = req.params.pictureName ? req.params.pictureName[0] : null;

    PictureService.readPicture(name, function (err, picture) {
      if (err) {
        next(err);
      } else {
        res.set('Content-Type', 'image/png');
        res.send(new Buffer(picture, 'binary'));
      }
    });
  };

  /**
   *
   */
  this.newPicture = function (req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null,
        path = req.files.picture.path,
        name = req.files.picture.name;

    PictureService.savePicture(name, path, slug, function (err) {
      if (err) {
        next(err);
      } else {
        res.redirect('/blog/admin/articles/' + slug);
      }
    });
  };

  /**
   *
   */
  this.deletePicture = function (req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null,
        name = req.params.pictureName ? req.params.pictureName[0] : null;

    PictureService.removePicture(name, function (err) {
      if (err) {
        next(err);
      } else {
        res.redirect('/blog/admin/articles/' + slug);
      }
    });
  };

};