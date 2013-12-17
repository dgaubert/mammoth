var userController = function userController(UserService) {
  var pwd = require('pwd');

  var controller =  {

    // render a list of users
    getUsers: function getUsers(req, res, next) {
      UserService.findAll(function findAllDone(err, users) {
        if (err) {
          return next(err);
        }
        res.render('blog/admin/users', {
          title: 'Administración de usuarios',
          section:'blog',
          users: users
        });
      });
    },

    // render form to create a new user
    getNewUser: function getNewUser(req, res) {
      res.render('blog/admin/user', {
        title: 'Nuevo usuario',
        section:'blog',
        user: undefined
      });
    },
    
    // create a new user
    newUser: function newUser(req, res, next) {
      var User = require('../models/user');
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
    },
    
    // render a user, searched by username
    getUser: function getUser(req, res, next) {
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
    },
    
    // Update a user, searched by username
    updateUser: function updateUser(req, res, next) {
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
  };

  return controller;
};

module.exports = userController;
