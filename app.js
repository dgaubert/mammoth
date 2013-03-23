// Module dependencies
var express = require('express'), // Web framework
    params = require('express-params'), // URL params
    http = require('http'),
    path = require('path'),
    stylus = require('stylus'), // CSS language
    home = require('./routes/home'), // Manage the home page
    blog = require('./routes/blog'), // Manage the blog
    comment = require('./routes/comment'), // Manage comments (blog)
    cloud = require('./routes/cloud'); // Manage word-cloud (blog)    
    guard = require('./routes/guard'), // Monitor admin section
    admin = require('./routes/admin'), // Manage admin page
    user = require('./routes/user'), // Manage user/s page (admin)
    article = require('./routes/article'); // Manage article/s page (admin)

var app = express(); // Load app to customize

// **
// Middleware & Setup
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
  // Show error trace into error pages
  app.enable('verbose errors');
});

// **
// Router
// **

// URL parmams (RE validation)
params.extend(app);
app.param('page', /^\d+$/);
app.param('category', /^[\w-]+$/);
app.param('tag', /^[\w-]+$/);
app.param('slug', /^[\w-]+$/);
app.param('username', /^[\w-]+$/);

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

// **
// Error handling
// **
app.use(function (req, res, next) {
  res.status(404);
  res.render('404', {url: req.url});
});
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('500', {error: err});
});

// **
// Server
// **
http.createServer(app).listen(app.get('port'), function () {
  console.log("Server listening on port " + app.get('port'));
});