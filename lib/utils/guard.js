module.exports = function () {

  /**
   * Checks if the path is under user restriction and if the user has
   * session.
   *  
   * @param  {Object}   req   Request
   * @param  {Object}   res   Response
   * @param  {Function} next  callback
   */
  var keepOn = function (req) {
    var restricted = /^\/blog\/admin(\/.*)?$/;

    if (req.path.match(restricted) && !req.session.user) {
      return false;
    }
    return true;
  };

  return {

    /**
     * Checks if user has a session
     * 
     * @param  {Object}   req   Request
     * @param  {Object}   res   Response
     * @param  {Function} next  callback
     */
    secure: function (req, res, next) {
      if (keepOn(req)) {
        return next();
      }
      res.redirect('/blog/login');
    }
  };
};
