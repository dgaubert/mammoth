module.exports = function (app, User) {

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
  var checkUser = function (req, res, next) {
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
  
  app.post('/blog/login', checkUser);

  /**
   * Logout and redirect to blog page
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   */
  var logout = function (req, res) {
    req.session.destroy(function () {
      res.redirect('/blog');
    });
  };
  
  app.get('/blog/logout', logout);

  /**
   * Render login page
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   */
  var getLogin = function (req, res) {
    res.render('blog/admin/login', {
      title: 'Autenticación',
      section:'blog'
    });
  };
  
  app.get('/blog/login', getLogin);
  
};
