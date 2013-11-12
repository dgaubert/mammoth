/**
 * Dependencies
 */
var express = require('express'), // Web framework
    params = require('express-params'), // URL params
    path = require('path'),
    stylus = require('stylus'), // CSS language
    moment = require('moment'), // Date parser
    Home = require('./routes/home'), // Manage the home page
    Blog = require('./routes/blog'), // Manage the blog
    Comment = require('./routes/comment'), // Manage comments (blog)
    Login = require('./routes/login'), // Monitor admin section
    Admin = require('./routes/admin'), // Manage admin page
    User = require('./routes/user'), // Manage user/s page (admin)
    Error = require('./routes/error'), // Error handler
    Article = require('./routes/article'), // Manage article/s page (admin)
    Rss = require('./routes/rss'),
    Guard = require('./utils/guard'),
    ArticleModel = require('./models/article'), // db model & service
    UserModel = require('./models/user'); // db model & service

var app = module.exports = express(); // Load app to customize

//  Rendering views helper 
app.locals.moment = moment;

/**
 * Middleware & Setup
 */
app.set('port', process.env.PORT);
app.set('views', __dirname + '/../views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.cookieParser('secreto'));
app.use(express.session());
app.use(express.methodOverride());
app.use(stylus.middleware({src: __dirname + '/../public'}));
app.use(express.static(path.join(__dirname, '/../public')));
var guard = new Guard();
app.use(guard.secure); // Restrict access routes under /blog/admin

/**
 * Development enviroment
 */
app.configure('development', function () {
  app.enable('verbose errors'); // Show error trace into error views
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

// Controllers
var home = new Home(ArticleModel);
app.get('/', home.getHome);

var blog = new Blog(ArticleModel);
app.get('/blog', blog.getSummary);
app.get('/blog/:page', blog.getSummary);
app.get('/blog/category/:category', blog.getSummary);
app.get('/blog/category/:category/:page', blog.getSummary);
app.get('/blog/tag/:tag', blog.getSummary);
app.get('/blog/tag/:tag/:page', blog.getSummary);
app.get('/blog/:slug', blog.getArticle);

var comment = new Comment(ArticleModel);
//app.post('/blog/:slug/comment', comment.newComment);
app.get('/blog/admin/articles/:slug/comments', comment.getComments);
app.del('/blog/admin/articles/:slug/comments/:commentId', comment.deleteComment);

var login = new Login(UserModel);
app.get('/blog/login', login.getLogin);
app.get('/blog/logout', login.logout);
app.post('/blog/login', login.checkUser);

var admin = new Admin();
app.get('/blog/admin', admin.getAdmin);

var user = new User(UserModel);
app.get('/blog/admin/users', user.getUsers);
app.get('/blog/admin/users/new', user.getNewUser);
app.post('/blog/admin/users/new', user.newUser);
app.get('/blog/admin/users/:username', user.getUser);
app.put('/blog/admin/users/:username', user.updateUser);

var article = new Article(ArticleModel);
app.get('/blog/admin/articles', article.getArticles);
app.get('/blog/admin/articles/new', article.getNewArticle);
app.post('/blog/admin/articles/new', article.newArticle);
app.get('/blog/admin/articles/:slug', article.getArticle);
app.put('/blog/admin/articles/:slug', article.updateArticle);

var rss = new Rss(ArticleModel);
app.get('/blog/rss', rss.getFeed);

// Error middleware
var error = new Error();
app.use(error.notFound);
app.use(error.serverError);
