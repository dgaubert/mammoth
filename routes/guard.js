// Module dependencies
var mongoose = require('mongoose'), // DB driver
    db = mongoose.createConnection('mongodb://localhost/mammoth'), // DB conexion
    userSchema = require('../models/user'), // Load schema
    User = db.model('User', userSchema), // Load model
    pwd = require('pwd');

exports.checkUser = function (req, res, next) {
  User.find({ username: req.body.username}, function (err, users) {
    if (err) {
      next();
    }
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
  });
};

exports.restrict = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/blog/login');
  }
};

exports.logout = function (req, res) {
  req.session.destroy(function () {
    res.redirect('/blog');
  });
};


exports.getLogin = function (req, res) {
  res.render('login');
};
