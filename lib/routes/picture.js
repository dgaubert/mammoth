/**
 * 
 */
module.exports = function (Picture) {

  /**
   *
   */
  this.getPicture = function (req, res, next) {
    var name = '' + req.params.pictureName;

    Picture.readPicture(name, function (err, picture) {
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
    var path = req.files.picture.path,
        name = req.files.picture.name,
        slug = '' + req.params.slug;

    Picture.savePicture(name, path, slug, function (err) {
      if (err) {
        next(err);
      } else {
        res.redirect('/blog/admin/articles/' + req.params.slug);
      }
    });
  };

  /**
   *
   */
  this.deletePicture = function (req, res, next) {
    var name = '' + req.params.pictureName;
    Picture.removePicture(name, function (err) {
      if (err) {
        next(err);
      } else {
        res.redirect('/blog/admin/articles/' + req.params.slug);
      }
    });
  };

};