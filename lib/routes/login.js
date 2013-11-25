/**
 * Module dependencies
 */
var pwd = require('pwd');

module.exports = function (User) {

  /**
   * Check the user logged
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   */
  this.checkUser = function (req, res, next) {
    User
      .find({username: req.body.username})
      .exec(function (err, users) {
        var user;
        
        if (err) {
          next();
        } else {
          user = users[0];
          if (user) {
            pwd.hash(req.body.password, user.salt, function (err, hash) {
              if (!err && hash == user.hash) {
                // Regenerate session
                req.session.regenerate(function () {
                  req.session.user = user;
                  res.redirect('/blog/admin');
                });
              } else {
                // Wrong pass
                res.redirect('/blog/login');
              }
            });
          } else {
            // Wrong user
            res.redirect('/blog/login');
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
  this.logout = function (req, res) {
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
  this.getLogin = function (req, res) {
    res.render('blog/admin/login', {
      title: 'Autenticación',
      section:'blog'
    });
  };
    
};
