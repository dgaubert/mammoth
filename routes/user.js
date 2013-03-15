var mongoose = require('mongoose'), // DB driver
    db = mongoose.createConnection('mongodb://localhost/mammoth'), // DB conexion
    userSchema = require('../models/user'), // Load schema
    User = db.model('User', userSchema), // Load model
    pwd = require('pwd');

// List

exports.getUsers = function (req, res) {
  User.find({}, {username: 1}, function (err, users) {
    res.render('users', {
      title: 'Administración de usuarios',
      section:'blog',
      users: users
    });
  });
};

// User

exports.getNewUser = function (req, res) {
  res.render('user', {
    title: 'Nuevo usuario',
    section:'blog',
    user: undefined
  });
};

exports.newUser = function (req, res, next) {
  User.find({username: req.body.username}, {username: 1}, function (err, users) {
    if (err || users.length > 0) {
      next(new Error('The user already exists'));
    } else {
      pwd.hash(req.body.password, function (err, salt, hash) {
        var user = new User();
        user.username = req.body.username;
        user.salt = salt;
        user.hash = hash;
        user.save(function (err) {
          if (err) {
            next(new Error('The user hasn\'t been created'));
          } else {
            res.redirect('/blog/admin/users/' + user.username);
          }
        });
      });
    }
  });
};

exports.getUser = function (req, res, next) {
  User.find({username: req.params.username}, {username: 1}, function (err, users) {
    if (err) {
      next();
    } else {
      res.render('user', {
        title: 'Edición usuario',
        section:'blog',
        user: users[0]
      });
    }
  });
};

exports.updateUser = function (req, res, next) {
  User.find({username: req.params.username}, {username: 1}, function (err, users) {
    var user = users[0];
    if (err) {
      next();
    } else {
      user.username = req.body.username;
      user.save(function (err) {
        if (err) {
          next(new Error('Can\'t update the user'));
        } else {
          res.redirect('/blog/admin/users/' + user.username);
        }
      });
    }
  });
};