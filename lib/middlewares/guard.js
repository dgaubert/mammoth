var guardMiddleware = function guardMiddleware() {

  // checks if the path is under user restriction and if the user has
  // session
  var keepOn = function keepOn(req) {
    var restricted = /^\/blog\/admin(\/.*)?$/;

    if (req.path.match(restricted) && !req.session.user) {
      return false;
    }
    return true;
  };

  var middleware = {

    // Checks if user has a session
    secure: function secure(req, res, next) {
      if (keepOn(req)) {
        return next();
      }
      res.redirect('/blog/login');
    }
  };

  return middleware;
};

module.exports = guardMiddleware;
