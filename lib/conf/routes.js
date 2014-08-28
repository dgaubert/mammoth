/* jslint node: true */
'use strict';

var params = require('express-params');

// models
var article = require('../models/article');
var picture = require('../models/picture');
var captcha = require('../models/captcha');
var user = require('../models/user');

// services
var articleService = require('../services/article')(article);
var pictureService = require('../services/picture')(picture);
var captchaService = require('../services/captcha')(captcha);
var userService = require('../services/user')(user);

// controllers
var articleController = require('../controllers/article')(articleService, pictureService);
var blogController = require('../controllers/blog')(articleService, captchaService);
var commentController = require('../controllers/comment')(articleService, captchaService);
var homeController = require('../controllers/home')(articleService);
var loginController = require('../controllers/login')(userService);
var pictureController = require('../controllers/picture')(pictureService);
var captchaController = require('../controllers/captcha')(captchaService);
var rssController = require('../controllers/rss')(articleService);
var userController = require('../controllers/user')(userService);

// routes
var adminRoute = require('../routes/admin')();

var blogRoute = require('../routes/blog')(blogController);
var captchaRoute = require('../routes/captcha')(captchaController);
var commentRoute = require('../routes/comment')(commentController);
var homeRoute = require('../routes/home')(homeController);
var loginRoute = require('../routes/login')(loginController);
var pictureRoute = require('../routes/picture')(pictureController);
var rssRoute = require('../routes/rss')(rssController);
var userRoute = require('../routes/user')(userController);

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

  app.get('/', homeRoute.show);

  app.get('/blog/login', loginRoute.show);
  app.post('/blog/login', loginRoute.check);
  app.get('/blog/logout', loginRoute.logout);

  app.post('/blog/:slug/comment', commentRoute.create);
  app.get('/blog/admin/articles/:slug/comments', commentRoute.list);
  app.del('/blog/admin/articles/:slug/comments/:commentId', commentRoute.remove);

  app.get('/blog/admin', adminRoute.show);

  app.get('/blog/admin/users', userRoute.list);
  app.get('/blog/admin/users/new', userRoute.show);
  app.post('/blog/admin/users/new', userRoute.create);
  app.get('/blog/admin/users/:username', userRoute.retrieve);
  app.put('/blog/admin/users/:username', userRoute.update);

  app.get('/blog/admin/articles', articleController.list);
  app.get('/blog/admin/articles/new', articleController.show);
  app.post('/blog/admin/articles/new', articleController.create);
  app.get('/blog/admin/articles/:slug', articleController.retrieve);
  app.put('/blog/admin/articles/:slug', articleController.update);

  app.get('/blog/pictures/:pictureName', pictureRoute.retrieve);
  app.post('/blog/admin/articles/:slug/pictures/new', pictureRoute.create);
  app.del('/blog/admin/articles/:slug/pictures/:pictureName', pictureRoute.remove);

  app.get('/blog/admin/captcha', captchaRoute.list);
  app.get('/blog/admin/captcha/new', captchaRoute.show);
  app.post('/blog/admin/captcha/new', captchaRoute.create);
  app.get('/blog/captcha/:captchaName', captchaRoute.retrieve);
  app.del('/blog/admin/captcha/:captchaName', captchaRoute.remove);

  app.get('/blog/rss', rssRoute.list);

  app.get('/blog', blogRoute.list);
  app.get('/blog/:page', blogRoute.list);
  app.get('/blog/category/:category', blogRoute.list);
  app.get('/blog/category/:category/:page', blogRoute.list);
  app.get('/blog/tag/:tag', blogRoute.list);
  app.get('/blog/tag/:tag/:page', blogRoute.list);
  app.get('/blog/:slug', blogRoute.retrieve);

}

module.exports.init = init;
