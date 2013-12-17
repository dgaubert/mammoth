var pictureController = function (PictureService) {

  var controller = {

    // 
    getPicture: function getPicture(req, res, next) {
      var name = req.params.pictureName ? req.params.pictureName[0] : null;

      PictureService.read(name, function readDone(err, picture) {
        if (err) {
          return next(err);
        }
        res.set('Content-Type', 'image/png');
        res.send(new Buffer(picture, 'binary'));
      });
    },

    // 
    newPicture: function newPicture(req, res, next) {
      var slug = req.params.slug ? req.params.slug[0] : null;
      var path = req.files.picture.path;
      var name = req.files.picture.name;

      PictureService.save(name, path, slug, function saveDone(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/blog/admin/articles/' + slug);
      });

    },

    //
    deletePicture: function deletePicture(req, res, next) {
      var slug = req.params.slug ? req.params.slug[0] : null;
      var name = req.params.pictureName ? req.params.pictureName[0] : null;

      PictureService.remove(name, function removeDone(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/blog/admin/articles/' + slug);
      });
    }
  };

  return controller;
};

module.exports = pictureController;
