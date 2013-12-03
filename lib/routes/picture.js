/**
 * 
 */
module.exports = function (Picture) {

  /**
   * Check the user logged
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   */
  this.getPicture = function (req, res, next) {
    Picture.readPicture(function (err, picture) {
      if (err) {
        next('Can\'t get picture');
      } else {
        res.set('Content-Type', 'image/png');
        res.sendFile(picture);
      }
    });
  };

  this.newPicture = function (req, res, next) {

    Picture.savePicture(function (err, picture) {
      if (err) {
        next(new Error('Can\'t write the picture'));
      } else {
        res.redirect('/blog/admin/articles/' + req.params.slug);
      }
    });
  };

  this.deletePicture = function (req, res, next) {
    // TODO
  };
};