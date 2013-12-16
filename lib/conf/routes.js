module.exports.init = function (app) {

  var params = require('express-params'),
      // models
      article = require('../models/article'),
      picture = require('../models/picture'),
      user = require('../models/user'),
      // services
      articleService = require('../services/article')(article),
      pictureService = require('../services/picture')(picture),
      userService = require('../services/user')(user),
      // controllers
      adminController = require('../controllers/admin')(),
      articleController = require('../controllers/article')(articleService, pictureService),
      blogController = require('../controllers/blog')(articleService),
      commentController = require('../controllers/comment')(articleService),
      homeController = require('../controllers/home')(articleService),
      loginController = require('../controllers/login')(userService),
      pictureController = require('../controllers/picture')(pictureService),
      rssController = require('../controllers/rss')(articleService),
      userController = require('../controllers/user')(userService);

  // url parameters
  params.extend(app);
  app.param('page', /^\d+$/);
  app.param('category', /^[\w-]+$/);
  app.param('tag', /^[\w-]+$/);
  app.param('slug', /^[\w-]+$/);
  app.param('username', /^[\w-]+$/);
  app.param('commentId', /^[\w]+$/);
  app.param('pictureName', /^[\w\-\.]+$/);

  app.get('/', homeController.getHome);

  app.get('/blog/login', loginController.getLogin);
  app.get('/blog/logout', loginController.logout);
  app.post('/blog/login', loginController.checkUser);

  app.get('/blog/admin/articles/:slug/comments', commentController.getComments);
  app.del('/blog/admin/articles/:slug/comments/:commentId', commentController.deleteComment);

  app.get('/blog/admin', adminController.getAdmin);

  app.get('/blog/admin/users', userController.getUsers);
  app.get('/blog/admin/users/new', userController.getNewUser);
  app.post('/blog/admin/users/new', userController.newUser);
  app.get('/blog/admin/users/:username', userController.getUser);
  app.put('/blog/admin/users/:username', userController.updateUser);

  app.get('/blog/admin/articles', articleController.getArticles);
  app.get('/blog/admin/articles/new', articleController.getNewArticle);
  app.post('/blog/admin/articles/new', articleController.newArticle);
  app.get('/blog/admin/articles/:slug', articleController.getArticle);
  app.put('/blog/admin/articles/:slug', articleController.updateArticle);

  app.get('/blog/pictures/:pictureName', pictureController.getPicture);
  app.post('/blog/admin/articles/:slug/pictures/new', pictureController.newPicture);
  app.del('/blog/admin/articles/:slug/pictures/:pictureName', pictureController.deletePicture);

  app.get('/blog/rss', rssController.getFeed);

  app.get('/blog', blogController.getSummary);
  app.get('/blog/:page', blogController.getSummary);
  app.get('/blog/category/:category', blogController.getSummary);
  app.get('/blog/category/:category/:page', blogController.getSummary);
  app.get('/blog/tag/:tag', blogController.getSummary);
  app.get('/blog/tag/:tag/:page', blogController.getSummary);
  app.get('/blog/:slug', blogController.getArticle);
  app.post('/blog/:slug/comment', blogController.newComment);

};
