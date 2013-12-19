var pwd = require('pwd');

function LoginController(UserService) {

  // public

  function check(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    UserService.findByUsername(username, function done(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/blog/login');
      }
      pwd.hash(password, user.salt, function done(err, hash) {
        if (err) {
          return next(err);
        }
        if (hash.toString('utf-8') !== user.hash) {
          return res.redirect('/blog/login');
        }
        // regenerate session
        req.session.regenerate(function done() {
          req.session.user = user;
          res.redirect('/blog/admin');
        });
      });
    });
  }

  function logout(req, res, next) {
    req.session.destroy(function done() {
      res.redirect('/blog');
    });
  }

  function show(req, res, next) {
    res.render('blog/admin/login', {
      title: 'Autenticación',
      section:'blog'
    });
  }

  // expose
  
  return {
    'check': check,
    'logout': logout,
    'show': show
  };
}

module.exports = LoginController;
