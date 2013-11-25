/**
 * Module dependencies
 */
var pwd = require('pwd');

module.exports = function (User) {

  /**
   * Render a list of users
   *   
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   */
  this.getUsers = function (req, res) {
    User
      .find()
      .select({
        username: 1
      })
      .exec(function (err, users) {
        res.render('blog/admin/users', {
          title: 'Administración de usuarios',
          section:'blog',
          users: users
        });
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
    User
      .find({
        username: req.body.username
      })
      .select({
        username: 1
      })
      .exec(function (err, users) {
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
  
  /**
   * Render a user, searched by username
   * 
   * @param  {Object} req : request
   * @param  {Object} res : response
   * @param  {Function} next : error handler
   * @return {Object} view with the user
   */
  this.getUser = function (req, res, next) {
    User
      .find({
        username: req.params.username
      })
      .select({
        username: 1
      })
      .exec(function (err, users) {
        if (err) {
          next();
        } else {
          res.render('blog/admin/user', {
            title: 'Edición usuario',
            section:'blog',
            user: users[0]
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
    User
      .find({
        username: req.params.username
      })
      .select({
        username: 1
      })
      .exec(function (err, users) {
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
  
};
