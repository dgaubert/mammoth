module.exports = function (UserService) {
  var User = require('../models/user'),
      pwd = require('pwd');

  var userController =  {

    /**
     * Render a list of users
     *   
     * @param  {Object}   req : request
     * @param  {Object}   res : response
     */
    getUsers: function (req, res, next) {
      UserService.findAll(function (err, users) {
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

    /**
     * Render form to create a new user
     * 
     * @param  {Object} req : request
     * @param  {Object} res : response
     * @return {Object} view with the form to create a new user
     */
    getNewUser: function (req, res) {
      res.render('blog/admin/user', {
        title: 'Nuevo usuario',
        section:'blog',
        user: undefined
      });
    },
    
    /**
     * Create a new user
     * 
     * @param  {Object} req : request
     * @param  {Object} res : response
     * @param  {Function} next : error handler
     */
    newUser: function (req, res, next) {
      var username = req.body.username;

      UserService.findByUsername(username, function (err, user) {
        if (err) {
          return next(err);
        }
        if (user) {
          return next(new Error('The user already exists'));
        }
        pwd.hash(req.body.password, function (err, salt, hash) {
          var user = new User();
          user.username = req.body.username;
          user.salt = salt;
          user.hash = hash;

          user.save(function (err) {
            if (err) {
              return next(err);
            }
            res.redirect('/blog/admin/users/' + user.username);
          });
        });
      });
    },
    
    /**
     * Render a user, searched by username
     * 
     * @param  {Object} req : request
     * @param  {Object} res : response
     * @param  {Function} next : error handler
     * @return {Object} view with the user
     */
    getUser: function (req, res, next) {
      var username = req.params.username ? req.params.username[0] : null;

      UserService.findByUsername(username, function (err, user) {
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
    
    /**
     * Update a user, searched by username
     * 
     * @param  {Object} req : request
     * @param  {Object} res : response
     * @param  {Function} next : error handler
     */
    updateUser: function (req, res, next) {
      var username = req.params.username ? req.params.username[0] : null;

      UserService.findByUsername(username, function (err, user) {
        if (err) {
          return next(err);
        }
        pwd.hash(req.body.password, function (err, salt, hash) {
          user.username = req.body.username;
          user.salt = salt;
          user.hash = hash;
          user.save(function (err) {
            if (err) {
              return next(err);
            }
            res.redirect('/blog/admin/users/' + user.username);
          });
        });
      });
    }
  };

  // Expose controller
  return userController;
};
