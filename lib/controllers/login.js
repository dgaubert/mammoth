var loginController = function loginController(UserService) {

  var controller = {
    
    // check the user logged
    checkUser: function checkUser(req, res, next) {
      var pwd = require('pwd');
      var username = req.body.username;
      var password = req.body.password;

      UserService.findByUsername(username, function findByUsernameDone(err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.redirect('/blog/login');
        }
        pwd.hash(password, user.salt, function hashDone(err, hash) {
          if (err) {
            return next(err);
          }
          if (hash.toString('utf-8') !== user.hash) {
            return res.redirect('/blog/login');
          }
          // regenerate session
          req.session.regenerate(function regenerateDone() {
            req.session.user = user;
            res.redirect('/blog/admin');
          });
        });
      });
    },
    
    // logout and redirect to blog page
    logout: function logout(req, res, next) {
      req.session.destroy(function destroyDone() {
        res.redirect('/blog');
      });
    },
    
    // render login page
    getLogin: function getLogin(req, res, next) {
      res.render('blog/admin/login', {
        title: 'Autenticación',
        section:'blog'
      });
    }
  };

  return controller;
};

module.exports = loginController;
