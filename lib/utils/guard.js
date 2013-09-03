
/**
 * Checks if user has a session
 * @param  {Object}   req   Request
 * @param  {Object}   res   Response
 * @param  {Function} next  callback
 */
exports.secure = function (req, res, next) {
  var securedPaths = /^\/blog\/admin(\/.*)?$/;
  if (req.path.match(securedPaths) !== null && !req.session.user) {
	res.redirect('/blog/login'); // No session
  } else {
	next();
  }
};