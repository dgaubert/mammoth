#!/bin/env node
/**
 * Setup env
 */
process.env.ROOT_URL = process.env.OPENSHIFT_APP_DNS || 'localhost';
process.env.APP_NAME = process.env.OPENSHIFT_APP_NAME || 'mammoth';
process.env.PORT = process.env.OPENSHIFT_INTERNAL_PORT || 8000;
process.env.IP = process.env.OPENSHIFT_INTERNAL_IP || '0.0.0.0';

/**
 * Module dependencies
 */
var express = require('express'), // Web framework
    params = require('express-params'), // URL params
    http = require('http'),
    path = require('path'),
    stylus = require('stylus'), // CSS language
    moment = require('moment'), // Date parser
    home = require('./routes/home'), // Manage the home page
    blog = require('./routes/blog'), // Manage the blog
    comment = require('./routes/comment'), // Manage comments (blog)
    cloud = require('./routes/cloud'); // Manage word-cloud (blog)    
    guard = require('./routes/guard'), // Monitor admin section
    admin = require('./routes/admin'), // Manage admin page
    user = require('./routes/user'), // Manage user/s page (admin)
    article = require('./routes/article'); // Manage article/s page (admin)

var app = express(); // Load app to customize

// helpful helpers are helpful 
// (these are used when rendering views etc.) 
app.locals.moment = moment;

/**
 * Middleware & Setup
 */
app.set('port', process.env.PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser('secreto'));
app.use(express.session());
app.use(express.methodOverride());
app.use(stylus.middleware({src: __dirname + '/public'}));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Development enviroment
 */
app.configure('development', function () {
  // Show error trace into error pages
  app.enable('verbose errors');
});

/**
 * Router
 */

// URL parmams (RE validation)
params.extend(app);
app.param('page', /^\d+$/);
app.param('category', /^[\w-]+$/);
app.param('tag', /^[\w-]+$/);
app.param('slug', /^[\w-]+$/);
app.param('username', /^[\w-]+$/);
app.param('commentId', /^[\w]+$/);

// Home
app.get('/', home.getHome);

// Blog
app.get('/blog', blog.getSummary);
app.get('/blog/:page', blog.getSummary);
app.get('/blog/category/:category',blog.getSummary);
app.get('/blog/category/:category/:page',blog.getSummary);
app.get('/blog/tag/:tag',blog.getSummary);
app.get('/blog/tag/:tag/:page',blog.getSummary);
app.get('/blog/:slug', blog.getArticle);
app.post('/blog/:slug/comment', comment.newComment);
app.get('/blog/word-cloud', cloud.getWords);

// Authentication
app.get('/blog/login', guard.getLogin);
app.post('/blog/login', guard.checkUser);
app.get('/blog/logout', guard.logout);

// Admin
app.get('/blog/admin', guard.restrict, admin.getAdmin);
app.get('/blog/admin/users', guard.restrict, user.getUsers);
app.get('/blog/admin/articles', guard.restrict, article.getArticles);

// User
app.get('/blog/admin/users/new', guard.restrict, user.getNewUser);
app.post('/blog/admin/users/new', guard.restrict, user.newUser);
app.get('/blog/admin/users/:username', guard.restrict, user.getUser);
app.put('/blog/admin/users/:username', guard.restrict, user.updateUser);

// Article
app.get('/blog/admin/articles/new', guard.restrict, article.getNewArticle);
app.post('/blog/admin/articles/new', guard.restrict, article.newArticle);
app.get('/blog/admin/articles/:slug', guard.restrict, article.getArticle);
app.put('/blog/admin/articles/:slug', guard.restrict, article.updateArticle);

// Comments
app.get('/blog/admin/articles/:slug/comments', guard.restrict, comment.getComments);
app.del('/blog/admin/articles/:slug/comments/:commentId', guard.restrict, comment.deleteComment);

/**
 * Error handling
 */
app.use(function (req, res, next) {
  res.status(404);
  res.render('404', {url: req.url});
});
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('500', {error: err});
});

/**
 * Server
 */
http.createServer(app).listen(process.env.PORT, process.env.IP, function () {
  console.log('Server running at http://' + process.env.IP + ":" + process.env.PORT);
});