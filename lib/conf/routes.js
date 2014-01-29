/* jslint node: true */
'use strict';

var params = require('express-params');

// models
var article = require('../models/article');
var picture = require('../models/picture');
var user = require('../models/user');

// services
var articleService = require('../services/article')(article);
var pictureService = require('../services/picture')(picture);
var userService = require('../services/user')(user);

// controllers
var adminController = require('../controllers/admin')();
var articleController = require('../controllers/article')(articleService, pictureService);
var blogController = require('../controllers/blog')(articleService);
var commentController = require('../controllers/comment')(articleService);
var homeController = require('../controllers/home')(articleService);
var loginController = require('../controllers/login')(userService);
var pictureController = require('../controllers/picture')(pictureService);
var rssController = require('../controllers/rss')(articleService);
var userController = require('../controllers/user')(userService);

function init(app) {
  
  // url parameters
  params.extend(app);
  app.param('page', /^\d+$/);
  app.param('category', /^[\w-]+$/);
  app.param('tag', /^[\w-]+$/);
  app.param('slug', /^[\w-]+$/);
  app.param('username', /^[\w-]+$/);
  app.param('commentId', /^[\w]+$/);
  app.param('pictureName', /^[\w\-\.]+$/);

  app.get('/', homeController.show);

  app.get('/blog/login', loginController.show);
  app.post('/blog/login', loginController.check);
  app.get('/blog/logout', loginController.logout);

  app.post('/blog/:slug/comment', commentController.create);
  app.get('/blog/admin/articles/:slug/comments', commentController.list);
  app.del('/blog/admin/articles/:slug/comments/:commentId', commentController.remove);

  app.get('/blog/admin', adminController.show);

  app.get('/blog/admin/users', userController.list);
  app.get('/blog/admin/users/new', userController.show);
  app.post('/blog/admin/users/new', userController.create);
  app.get('/blog/admin/users/:username', userController.retrieve);
  app.put('/blog/admin/users/:username', userController.update);

  app.get('/blog/admin/articles', articleController.list);
  app.get('/blog/admin/articles/new', articleController.show);
  app.post('/blog/admin/articles/new', articleController.create);
  app.get('/blog/admin/articles/:slug', articleController.retrieve);
  app.put('/blog/admin/articles/:slug', articleController.update);

  app.get('/blog/pictures/:pictureName', pictureController.retrieve);
  app.post('/blog/admin/articles/:slug/pictures/new', pictureController.create);
  app.del('/blog/admin/articles/:slug/pictures/:pictureName', pictureController.remove);

  app.get('/blog/rss', rssController.list);

  app.get('/blog', blogController.list);
  app.get('/blog/:page', blogController.list);
  app.get('/blog/category/:category', blogController.list);
  app.get('/blog/category/:category/:page', blogController.list);
  app.get('/blog/tag/:tag', blogController.list);
  app.get('/blog/tag/:tag/:page', blogController.list);
  app.get('/blog/:slug', blogController.retrieve);

}

module.exports.init = init;
