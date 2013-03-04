// Module dependencies
var express = require('express'),
    params = require('express-params'),
    http = require('http'),
    path = require('path'),
    stylus = require('stylus'),
    home = require('./routes/home'),
    blog = require('./routes/blog'),
    user = require('./routes/user'),
    guard = require('./routes/guard'),
    admin = require('./routes/admin'),
    pwd = require('pwd');

var app = express();

// **
// Setup
// **
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser('secreto'));
app.use(express.session());
app.use(express.methodOverride());
app.use(stylus.middleware({src: __dirname + '/public'}));
app.use(express.static(path.join(__dirname, 'public')));

// Development enviroment
app.configure('development', function () {
  // shows error trace into error pages
  app.enable('verbose errors');
});

// **
// Router
// **

// Parmam RE validation
params.extend(app);

// Home
app.get('/', home.getHome);

// Blog
app.param('page', /^\d+$/);
app.get('/blog', blog.getSummary);
app.get('/blog/:page', blog.getSummary);
app.param('category', /^[\w-]+$/);
app.get('/blog/category/:category',blog.getSummary);
app.get('/blog/category/:category/:page',blog.getSummary);
app.param('tag', /^[\w-]+$/);
app.get('/blog/tag/:tag',blog.getSummary);
app.get('/blog/tag/:tag/:page',blog.getSummary);
app.param('slug', /^[\w-]+$/);
app.get('/blog/:slug', blog.getPost);
app.post('/blog/:slug/comment', blog.newComment);
app.get('/blog/word-cloud', blog.getWordCloud);

// Authentication
app.get('/blog/login', guard.getLogin);
app.post('/blog/login', guard.checkUser);
app.get('/blog/logout', guard.logout);

// Admin
app.get('/blog/admin', guard.restrict, admin.getAdmin);
app.get('/blog/admin/users', guard.restrict, admin.getUsers);
app.get('/blog/admin/articles', guard.restrict, admin.getArticles);

// User
app.param('username', /^[\w-]+$/);
app.get('/blog/admin/user/new', guard.restrict, admin.getNewUser);
app.post('/blog/admin/user/new', guard.restrict, admin.newUser);
app.get('/blog/admin/user/:username', guard.restrict, admin.getUser);
app.post('/blog/admin/user/:username', guard.restrict, admin.updateUser);

// Article
app.param('article', /^[\w-]+$/);
app.get('/blog/admin/article/new', guard.restrict, admin.getNewUser);
app.post('/blog/admin/article/new', guard.restrict, admin.newUser);
app.get('/blog/admin/article/:article', guard.restrict, admin.getUser);
app.post('/blog/admin/article/:article', guard.restrict, admin.updateUser);

// **
// Error handling
// **
app.use(function (req, res, next) {
  res.status(404);
  res.render('404', { url: req.url });
});
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('500', { error: err });
});

// **
// Server
// **
http.createServer(app).listen(app.get('port'), function () {
  console.log("Server listening on port " + app.get('port'));
});