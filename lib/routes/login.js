/**
 * Module dependencies
 */
var mongoose = require('mongoose'), // DB driver
    db = mongoose.createConnection(require('../conf/db')), // DB conexion
    userSchema = require('../models/user'), // Load schema
    User = db.model('User', userSchema), // Load model
    pwd = require('pwd');

/**
 * Check the user logged
 * 
 * @param  {Object}   req : request
 * @param  {Object}   res : response
 * @param  {Function} next : error handler
 */
exports.checkUser = function (req, res, next) {
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

/**
 * Logout and redirect to blog page
 * 
 * @param  {Object}   req : request
 * @param  {Object}   res : response
 */
exports.logout = function (req, res) {
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
exports.getLogin = function (req, res) {
  res.render('blog/admin/login', {
    title: 'Autenticación',
    section:'blog'
  });
};