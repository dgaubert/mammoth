/* jslint node: true */
'use strict';

function GuardMiddleware() {

  // private

  // checks if the path is under user restriction
  // and checks if the user has session
  function keepOn(req) {
    var restricted = /^\/blog\/admin(\/.*)?$/;

    if (req.path.match(restricted) && !req.session.user) {
      return false;
    }
    return true;
  }

  // public

  // checks if user has a session
  function secure(req, res, next) {
    if (keepOn(req)) {
      return next();
    }
    res.redirect('/blog/login');
  }

  // public

  return {
    'secure': secure
  };
}

module.exports = GuardMiddleware;
