'use strict';

function GuardMiddleware() {}

GuardMiddleware.prototype = {

  // checks if the path is under user restriction
  // and checks if the user has session
  _keepOn: function (req) {
    var restricted = /^\/blog\/admin(\/.*)?$/;

    if (req.path.match(restricted) && !req.session.user) {
      return false;
    }

    return true;
  },

  // checks if user has a session
  secure: function (req, res, next) {
    if (this._keepOn(req)) {
      return next();
    }

    res.redirect('/blog/login');
  }
};

module.exports = GuardMiddleware;
