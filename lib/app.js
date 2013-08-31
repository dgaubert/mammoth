/**
 * Dependencies
 */
var express = require('express'), // Web framework
    params = require('express-params'), // URL params
    path = require('path'),
    stylus = require('stylus'), // CSS language
    moment = require('moment'), // Date parser
    home = require('./routes/home'), // Manage the home page
    blog = require('./routes/blog'), // Manage the blog
    comment = require('./routes/comment'), // Manage comments (blog)
    cloud = require('./routes/cloud'); // Manage word-cloud (blog)    
    login = require('./routes/login'), // Monitor admin section
    admin = require('./routes/admin'), // Manage admin page
    user = require('./routes/user'), // Manage user/s page (admin)
    error = require('./routes/error'), // Error handler
    article = require('./routes/article'), // Manage article/s page (admin)
    rss = require('./routes/rss'),
    guard = require('./utils/guard');

var app = module.exports = express(); // Load app to customize


// helpful helpers are helpful 
// (these are used when rendering views etc.) 
app.locals.moment = moment;

/**
 * Middleware & Setup
 */
app.set('port', process.env.PORT);
app.set('views', __dirname + '/../views');
app.set('view engine', 'jade');
//app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser('secreto'));
app.use(express.session());
app.use(express.methodOverride());
app.use(stylus.middleware({src: __dirname + '/../public'}));
app.use(express.static(path.join(__dirname, '/../public')));
app.use(guard.secure);

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
app.get('/blog/login', login.getLogin);
app.post('/blog/login', login.checkUser);
app.get('/blog/logout', login.logout);

// Admin
app.get('/blog/admin', admin.getAdmin);
app.get('/blog/admin/users', user.getUsers);
app.get('/blog/admin/articles', article.getArticles);

// User
app.get('/blog/admin/users/new', user.getNewUser);
app.post('/blog/admin/users/new', user.newUser);
app.get('/blog/admin/users/:username', user.getUser);
app.put('/blog/admin/users/:username', user.updateUser);

// Article
app.get('/blog/admin/articles/new', article.getNewArticle);
app.post('/blog/admin/articles/new', article.newArticle);
app.get('/blog/admin/articles/:slug', article.getArticle);
app.put('/blog/admin/articles/:slug', article.updateArticle);

// Comments
app.get('/blog/admin/articles/:slug/comments', comment.getComments);
app.del('/blog/admin/articles/:slug/comments/:commentId', comment.deleteComment);

// RSS Blog Syndication
app.get('/blog/rss', rss.getFeed);

// Error middleware
app.use(error.notFound);
app.use(error.serverError);