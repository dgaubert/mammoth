/* jslint node: true */
'use strict';

var params = require('express-params');

var ArticleController = require('../controllers/article');
var AdminController = require('../controllers/admin');
var RssController = require('../controllers/rss');
var BlogController = require('../controllers/blog');
var CaptchaController = require('../controllers/captcha');

// models
var Article = require('../models/article');
var Picture = require('../models/picture');
var Captcha = require('../models/captcha');
var User = require('../models/user');

// DAOs
var articleDao = require('../dao/article')(Article);
var pictureDao = require('../dao/picture')(Picture);
var captchaDao = require('../dao/captcha')(Captcha);
var userDao = require('../dao/user')(User);

// services
var articleService = require('../services/article')(articleDao, pictureDao);
var blogService = require('../services/blog')(articleDao, captchaDao);
var commentService = require('../services/comment')(articleDao, captchaDao);
var homeService = require('../services/home')(articleDao);
var loginService = require('../services/login')(userDao);
var pictureService = require('../services/picture')(pictureDao);
var captchaService = require('../services/captcha')(captchaDao);
var rssService = require('../services/rss')(articleDao);
var userService = require('../services/user')(userDao);

// controllers
var adminController = new AdminController();
var articleController = new ArticleController(articleService);
var blogController = new BlogController(blogService);
var captchaController = new CaptchaController(captchaService);
var commentController = require('../controllers/comment')(commentService);
var homeController = require('../controllers/home')(homeService);
var loginController = require('../controllers/login')(loginService);
var pictureController = require('../controllers/picture')(pictureService);
var rssController = new RssController(rssService);
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

  app.get('/blog/admin/articles', articleController.list.bind(articleController));
  app.get('/blog/admin/articles/new', articleController.show.bind(articleController));
  app.post('/blog/admin/articles/new', articleController.create.bind(articleController));
  app.get('/blog/admin/articles/:slug', articleController.retrieve.bind(articleController));
  app.put('/blog/admin/articles/:slug', articleController.update.bind(articleController));

  app.get('/blog/pictures/:pictureName', pictureController.retrieve);
  app.post('/blog/admin/articles/:slug/pictures/new', pictureController.create);
  app.del('/blog/admin/articles/:slug/pictures/:pictureName', pictureController.remove);

  app.get('/blog/admin/captcha', captchaController.list.bind(captchaController));
  app.get('/blog/admin/captcha/new', captchaController.show.bind(captchaController));
  app.post('/blog/admin/captcha/new', captchaController.create.bind(captchaController));
  app.get('/blog/captcha/:captchaName', captchaController.retrieve.bind(captchaController));
  app.del('/blog/admin/captcha/:captchaName', captchaController.remove.bind(captchaController));

  app.get('/blog/rss', rssController.list.bind(rssController));

  app.get('/blog', blogController.list.bind(blogController));
  app.get('/blog/:page', blogController.list.bind(blogController));
  app.get('/blog/category/:category', blogController.list.bind(blogController));
  app.get('/blog/category/:category/:page', blogController.list.bind(blogController));
  app.get('/blog/tag/:tag', blogController.list.bind(blogController));
  app.get('/blog/tag/:tag/:page', blogController.list.bind(blogController));
  app.get('/blog/:slug', blogController.retrieve.bind(blogController));
}

module.exports.init = init;
