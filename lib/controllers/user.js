var User = require('../models/user');
var pwd = require('pwd');

function userController(UserService) {

  
  // render a list of users
  function getUsers(req, res, next) {
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
  
  // render form to create a new user
  function getNewUser(req, res) {
    res.render('blog/admin/user', {
      title: 'Nuevo usuario',
      section:'blog',
      user: undefined
    });
  }

  // create a new user
  function newUser(req, res, next) {
    var username = req.body.username;

    UserService.findByUsername(username, function findByUsernameDone(err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        return next(new Error('The user already exists'));
      }
      
      pwd.hash(req.body.password, function hashDone(err, salt, hash) {
        var user = new User();

        user.username = req.body.username;
        user.salt = salt;
        user.hash = hash;

        user.save(function saveDone(err) {
          if (err) {
            return next(err);
          }
          res.redirect('/blog/admin/users/' + user.username);
        });
      });
    });
  }

  // render a user, searched by username
  function getUser(req, res, next) {
    var username = req.params.username ? req.params.username[0] : null;

    UserService.findByUsername(username, function findByUsernameDone(err, user) {
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

  // update user, searched by username
  function updateUser(req, res, next) {
    var username = req.params.username ? req.params.username[0] : null;

    UserService.findByUsername(username, function findByUsernameDone(err, user) {
      if (err) {
        return next(err);
      }
      pwd.hash(req.body.password, function hashDone(err, salt, hash) {
        user.username = req.body.username;
        user.salt = salt;
        user.hash = hash;
        user.save(function saveDone(err) {
          if (err) {
            return next(err);
          }
          res.redirect('/blog/admin/users/' + user.username);
        });
      });
    });
  }

  return {
    'getUsers': getUsers,
    'getNewUser': getNewUser,
    'newUser': newUser,
    'getUser': getUser,
    'updateUser': updateUser
  };
}

module.exports = userController;
