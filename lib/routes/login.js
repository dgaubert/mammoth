/**
 * Module dependencies
 */
var pwd = require('pwd');

module.exports = function (UserService) {

  return {
    
    /**
     * Check the user logged
     * 
     * @param  {Object}   req : request
     * @param  {Object}   res : response
     * @param  {Function} next : error handler
     */
    checkUser: function (req, res, next) {
      var username = req.body.username,
          password = req.body.password;

      UserService.findByUsername(username, function (err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.redirect('/blog/login');
        }
        pwd.hash(password, user.salt, function (err, hash) {
          if (err) {
            return next(err);
          }
          if (hash !== user.hash) {
            res.redirect('/blog/login');
          }
          // Regenerate session
          req.session.regenerate(function () {
            req.session.user = user;
            res.redirect('/blog/admin');
          });
        });
      });
    },
    
    /**
     * Logout and redirect to blog page
     * 
     * @param  {Object}   req : request
     * @param  {Object}   res : response
     */
    logout: function (req, res, next) {
      req.session.destroy(function () {
        res.redirect('/blog');
      });
    },
    
    /**
     * Render login page
     * 
     * @param  {Object}   req : request
     * @param  {Object}   res : response
     */
    getLogin: function (req, res, next) {
      res.render('blog/admin/login', {
        title: 'Autenticación',
        section:'blog'
      });
    }
  };
};
