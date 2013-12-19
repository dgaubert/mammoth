var User = require('../models/user');
var pwd = require('pwd');

function UserController(UserService) {

  // public

  function list(req, res, next) {
    UserService.find(function done(err, users) {
      if (err) {
        return next(err);
      }
      res.render('blog/admin/users', {
        title: 'Administración de usuarios',
        section:'blog',
        users: users
      });
    });
  }
  
  function show(req, res) {
    res.render('blog/admin/user', {
      title: 'Nuevo usuario',
      section:'blog',
      user: undefined
    });
  }

  function create(req, res, next) {
    var username = req.body.username;

    UserService.findByUsername(username, function done(err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        return next(new Error('The user already exists'));
      }
      
      pwd.hash(req.body.password, function done(err, salt, hash) {
        var user = new User();

        user.username = req.body.username;
        user.salt = salt;
        user.hash = hash;

        user.save(function done(err) {
          if (err) {
            return next(err);
          }
          res.redirect('/blog/admin/users/' + user.username);
        });
      });
    });
  }

  function retrieve(req, res, next) {
    var username = req.params.username ? req.params.username[0] : null;

    UserService.findByUsername(username, function done(err, user) {
      if (err) {
        return next(err);
      }
      res.render('blog/admin/user', {
        title: 'Edición usuario',
        section:'blog',
        user: user
      });
    });
  }

  function update(req, res, next) {
    var username = req.params.username ? req.params.username[0] : null;

    UserService.findByUsername(username, function done(err, user) {
      if (err) {
        return next(err);
      }
      pwd.hash(req.body.password, function done(err, salt, hash) {
        user.username = req.body.username;
        user.salt = salt;
        user.hash = hash;
        user.save(function done(err) {
          if (err) {
            return next(err);
          }
          res.redirect('/blog/admin/users/' + user.username);
        });
      });
    });
  }

  // expose API
  return {
    'create': create,
    'list': list,
    'show': show,
    'retrieve': retrieve,
    'update': update
  };
}

module.exports = UserController;
