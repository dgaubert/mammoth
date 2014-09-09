/* jslint node: true */
'use strict';

var params = require('express-params');

// models
var ArticleModel = require('../models/article');
var CaptchaModel = require('../models/captcha');
var PictureModel = require('../models/picture');
var UserModel = require('../models/user');

// daos
var ArticleDao = require('../dao/article');
var CaptchaDao = require('../dao/captcha');
var PictureDao = require('../dao/picture');
var UserDao = require('../dao/user');

// services
var ArticleService = require('../services/article');
var BlogService = require('../services/blog');
var CaptchaService = require('../services/captcha');
var CommentService = require('../services/comment');
var HomeService = require('../services/home');
var LoginService = require('../services/login');
var PictureService = require('../services/picture');
var RssService = require('../services/rss');
var UserService = require('../services/user');

// controllers
var ArticleController = require('../controllers/article');
var AdminController = require('../controllers/admin');
var RssController = require('../controllers/rss');
var BlogController = require('../controllers/blog');
var CaptchaController = require('../controllers/captcha');
var CommentController = require('../controllers/comment');
var HomeController = require('../controllers/home');
var LoginController = require('../controllers/login');
var PictureController = require('../controllers/picture');
var UserController = require('../controllers/user');

// daos
var articleDao = new ArticleDao(ArticleModel);
var captchaDao = new CaptchaDao(CaptchaModel);
var pictureDao = new PictureDao(PictureModel);
var userDao = new UserDao(UserModel);

// services
var articleService = new ArticleService(articleDao, pictureDao);
var blogService = new BlogService(articleDao, captchaDao);
var commentService = new CommentService(articleDao, captchaDao);
var homeService = new HomeService(articleDao);
var loginService = new LoginService(userDao);
var pictureService = new PictureService(pictureDao);
var captchaService = new CaptchaService(captchaDao);
var rssService = new RssService(articleDao);
var userService = new UserService(userDao);

// controllers
var adminController = new AdminController();
var articleController = new ArticleController(articleService);
var blogController = new BlogController(blogService);
var captchaController = new CaptchaController(captchaService);
var rssController = new RssController(rssService);
var commentController = new CommentController(commentService);
var homeController = new HomeController(homeService);
var loginController = new LoginController(loginService);
var pictureController = new PictureController(pictureService);
var userController = new UserController(userService);

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

  app.get('/', homeController.show.bind(homeController));

  app.get('/blog/login', loginController.show.bind(loginController));
  app.post('/blog/login', loginController.check.bind(loginController));
  app.get('/blog/logout', loginController.logout.bind(loginController));

  app.post('/blog/:slug/comment', commentController.create.bind(commentController));
  app.get('/blog/admin/articles/:slug/comments', commentController.list.bind(commentController));
  app.del('/blog/admin/articles/:slug/comments/:commentId', commentController.remove.bind(commentController));

  app.get('/blog/admin', adminController.show.bind(adminController));

  app.get('/blog/admin/users', userController.list.bind(userController));
  app.get('/blog/admin/users/new', userController.show.bind(userController));
  app.post('/blog/admin/users/new', userController.create.bind(userController));
  app.get('/blog/admin/users/:username', userController.retrieve.bind(userController));
  app.put('/blog/admin/users/:username', userController.update.bind(userController));

  app.get('/blog/admin/articles', articleController.list.bind(articleController));
  app.get('/blog/admin/articles/new', articleController.show.bind(articleController));
  app.post('/blog/admin/articles/new', articleController.create.bind(articleController));
  app.get('/blog/admin/articles/:slug', articleController.retrieve.bind(articleController));
  app.put('/blog/admin/articles/:slug', articleController.update.bind(articleController));

  app.get('/blog/pictures/:pictureName', pictureController.retrieve.bind(pictureController));
  app.post('/blog/admin/articles/:slug/pictures/new', pictureController.create.bind(pictureController));
  app.del('/blog/admin/articles/:slug/pictures/:pictureName', pictureController.remove.bind(pictureController));

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
