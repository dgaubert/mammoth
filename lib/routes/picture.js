module.exports = function (PictureService) {

  return {

    /**
     *
     */
    getPicture: function (req, res, next) {
      var name = req.params.pictureName ? req.params.pictureName[0] : null;

      PictureService.readPicture(name, function (err, picture) {
        if (err) {
          return next(err);
        }
        res.set('Content-Type', 'image/png');
        res.send(new Buffer(picture, 'binary'));
      });
    },

    /**
     *
     */
    newPicture: function (req, res, next) {
      var slug = req.params.slug ? req.params.slug[0] : null,
          path = req.files.picture.path,
          name = req.files.picture.name;

      PictureService.savePicture(name, path, slug, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/blog/admin/articles/' + slug);
      });

    },

    /**
     *
     */
    deletePicture: function (req, res, next) {
      var slug = req.params.slug ? req.params.slug[0] : null,
          name = req.params.pictureName ? req.params.pictureName[0] : null;

      PictureService.removePicture(name, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/blog/admin/articles/' + slug);
      });
    }
  };
};