/* jslint node: true */
'use strict';

var GuardMiddleware = function GuardMiddleware() {};

// private

// checks if the path is under user restriction
// and checks if the user has session
GuardMiddleware.prototype._keepOn = function _keepOn(req) {
  var restricted = /^\/blog\/admin(\/.*)?$/;

  if (req.path.match(restricted) && !req.session.user) return false;

  return true;
};

// public

// checks if user has a session
GuardMiddleware.prototype.secure = function secure(req, res, next) {
  if (this._keepOn(req)) return next();

  res.redirect('/blog/login');
};

module.exports = GuardMiddleware;
