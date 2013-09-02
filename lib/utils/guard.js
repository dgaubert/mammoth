
/**
 * Checks if user has a session
 * @param  {Object}   req   Request
 * @param  {Object}   res   Response
 * @param  {Object}   regex Regular expression
 * @param  {Function} next  callback
 */
exports.secure = function (req, res, next) {
  if (req.path.match(/^\/blog\/admin(\/.*)?$/) !== null) {
    if (!req.session.user) {
      res.redirect('/blog/login'); // No session
    }
  }
  next();
};