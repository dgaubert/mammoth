/**
 * Module dependencies
 */
var User = require('../models/user'),
    pwd = require('pwd');

module.exports = function (UserService) {

  /**
   * Render a list of users
   *   
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   */
  this.getUsers = function (req, res, next) {
    UserService.findAll(function (err, users) {
      if (err) {
        next(err);
      } else {
        res.render('blog/admin/users', {
          title: 'Administración de usuarios',
          section:'blog',
          users: users
        });
      }
    });
  };

  /**
   * Render form to create a new user
   * 
   * @param  {Object} req : request
   * @param  {Object} res : response
   * @return {Object} view with the form to create a new user
   */
  this.getNewUser = function (req, res) {
    res.render('blog/admin/user', {
      title: 'Nuevo usuario',
      section:'blog',
      user: undefined
    });
  };
  
  /**
   * Create a new user
   * 
   * @param  {Object} req : request
   * @param  {Object} res : response
   * @param  {Function} next : error handler
   */
  this.newUser = function (req, res, next) {
    var username = req.body.username;

    UserService.findByUsername(username, function (err, users) {
      if (err) {
        next(err);
      } else if (users.length) {
        next(new Error('The user already exists'));
      } else {
        pwd.hash(req.body.password, function (err, salt, hash) {
          var user = new User();
          user.username = req.body.username;
          user.salt = salt;
          user.hash = hash;
          user.save(function (err) {
            if (err) {
              next(err);
            } else {
              res.redirect('/blog/admin/users/' + user.username);
            }
          });
        });
      }
    });
  };
  
  /**
   * Render a user, searched by username
   * 
   * @param  {Object} req : request
   * @param  {Object} res : response
   * @param  {Function} next : error handler
   * @return {Object} view with the user
   */
  this.getUser = function (req, res, next) {
    var username = '' + req.params.username;

    UserService.findByUsername(username, function (err, user) {
      if (err) {
        next(err);
      } else {
        res.render('blog/admin/user', {
          title: 'Edición usuario',
          section:'blog',
          user: user
        });
      }
    });
  };
  
  /**
   * Update a user, searched by username
   * 
   * @param  {Object} req : request
   * @param  {Object} res : response
   * @param  {Function} next : error handler
   */
  this.updateUser = function (req, res, next) {
    var username = '' + req.params.username;

    UserService.findByUsername(username, function (err, user) {
      if (err) {
        next(err);
      } else {
        user.username = req.body.username;
        user.password = req.body.password;
        user.save(function (err) {
          if (err) {
            next(err);
          } else {
            res.redirect('/blog/admin/users/' + user.username);
          }
        });
      }
    });
  };
  
};
