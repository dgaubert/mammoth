/**
 * [ description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.notFound = function (req, res, next) {
  res.status(404);
  res.render('error/404', {url: req.url});
};

/**
 * [ description]
 * @param  {[type]}   err  [description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.serverError = function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error/500', {error: err});
};