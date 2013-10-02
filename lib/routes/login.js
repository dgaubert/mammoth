module.exports.init = function (User) {

  /**
   * Module dependencies
   */
  var pwd = require('pwd');

  /**
   * Check the user logged
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   */
  module.exports.checkUser = function (req, res, next) {
    User.find({ username: req.body.username}, function (err, users) {
      if (err) {
        next();
      } else {
        var user = users[0];
        if (user) {
          pwd.hash(req.body.password, user.salt, function (err, hash) {
            if (!err && hash == user.hash) {
              req.session.regenerate(function () { // Regenerate session
                req.session.user = user;
                res.redirect('/blog/admin');
              });
            } else {
              res.redirect('/blog/login'); // Wrong pass
            }
          });
        } else {
          res.redirect('/blog/login'); // Wrong user
        }
      }
    });
  };
  
  /**
   * Logout and redirect to blog page
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   */
  module.exports.logout = function (req, res) {
    req.session.destroy(function () {
      res.redirect('/blog');
    });
  };
  
  /**
   * Render login page
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   */
  module.exports.getLogin = function (req, res) {
    res.render('blog/admin/login', {
      title: 'Autenticación',
      section:'blog'
    });
  };
    
};
