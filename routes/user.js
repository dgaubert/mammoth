var mongoose = require('mongoose') // DB driver
  , db = mongoose.createConnection('mongodb://localhost/mammoth') // DB conexion
  , userSchema = require('../models/user') // Load schema
  , User = db.model('User', userSchema) // Load model
  , pwd = require('pwd');


exports.getUser = function (req, res, next) {
  User.find({username: req.params.username}, function (err, users) {
    if (err || users[0] === undefined) {
      next();
    } else {
      res.render('user', {user: users[0]});
    }
  });
}

exports.getNewUser = function (req, res) {
  res.render('user', {user: undefined});
}

exports.newUser = function (req, res, next) {
  pwd.hash(req.body.password, function (err, salt, hash) {
    if (!err) {
      var user = new User({
        username: req.body.username,
        hash: hash,
        salt: salt
      });
      user.save(function (err) {
        if (err) {
          next(err);
        }
        res.redirect('/blog/login');
      });
    }
  });
}

exports.updateUser = function (req, res, next) {
  function saveUser (user) {
    user.save(function (err) {
      if (err) {
        next(err);
      } else {
        res.render('user', {user: user});
      }
    });
  }
  User.find({username: req.params.username}, function (err, users) {
    var user = users[0];
    if (err || user === undefined) {
      next(err);
    } else {
      user.username = req.body.username;
      if (req.body.password === undefined) {
        saveUser(user);
      } else {
        pwd.hash(req.body.password, function (err, salt, hash) {
          if (err) {
            next(err);
          } else {
            user.salt = salt;
            user.hash = hash;
            saveUser(user);
          }
        }); 
      }
    }
  });
}

exports.deleteUser = function (req, res) {
  //TODO
}
