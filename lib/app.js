/**
 * Dependencies
 */
var express = require('express'),
    params = require('express-params'),
    path = require('path'),
    moment = require('moment'),
    ArticleService = require('./services/article-service'),
    UserService = require('./services/user-service'),
    PictureService = require('./services/picture-service'),
    HomeRoute = require('./routes/home'),
    BlogRoute = require('./routes/blog'),
    CommentRoute = require('./routes/comment'),
    LoginRoute = require('./routes/login'),
    AdminRoute = require('./routes/admin'),
    UserRoute = require('./routes/user'),
    ErrorRoute = require('./routes/error'),
    ArticleRoute = require('./routes/article'),
    RssRoute = require('./routes/rss'),
    PictureRoute = require('./routes/picture'),
    Guard = require('./utils/guard');

var app = module.exports = express();

//  Rendering views helper (date parser) 
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
app.use(express.static(path.join(__dirname, '/../public')));

var guard = Guard();
app.use(guard.secure); // Restrict access routes under /blog/admin

/**
 * Development enviroment
 */
app.configure('development', function () {
  app.enable('verbose errors'); // Show error trace into error views
});

/**
 * Routes
 */

// URL parmams (RE validation)
params.extend(app);
app.param('page', /^\d+$/);
app.param('category', /^[\w-]+$/);
app.param('tag', /^[\w-]+$/);
app.param('slug', /^[\w-]+$/);
app.param('username', /^[\w-]+$/);
app.param('commentId', /^[\w]+$/);
app.param('pictureName', /^[\w\-\.]+$/);

// Controllers
var home = HomeRoute(ArticleService);
app.get('/', home.getHome);

var login = LoginRoute(UserService);
app.get('/blog/login', login.getLogin);
app.get('/blog/logout', login.logout);
app.post('/blog/login', login.checkUser);

var comment = CommentRoute(ArticleService);
app.get('/blog/admin/articles/:slug/comments', comment.getComments);
app.del('/blog/admin/articles/:slug/comments/:commentId', comment.deleteComment);

var admin = AdminRoute();
app.get('/blog/admin', admin.getAdmin);

var user = UserRoute(UserService);
app.get('/blog/admin/users', user.getUsers);
app.get('/blog/admin/users/new', user.getNewUser);
app.post('/blog/admin/users/new', user.newUser);
app.get('/blog/admin/users/:username', user.getUser);
app.put('/blog/admin/users/:username', user.updateUser);

var article = ArticleRoute(ArticleService, PictureService);
app.get('/blog/admin/articles', article.getArticles);
app.get('/blog/admin/articles/new', article.getNewArticle);
app.post('/blog/admin/articles/new', article.newArticle);
app.get('/blog/admin/articles/:slug', article.getArticle);
app.put('/blog/admin/articles/:slug', article.updateArticle);

var picture = PictureRoute(PictureService);
app.get('/blog/pictures/:pictureName', picture.getPicture);
app.post('/blog/admin/articles/:slug/pictures/new', picture.newPicture);
app.del('/blog/admin/articles/:slug/pictures/:pictureName', picture.deletePicture);

var rss = RssRoute(ArticleService);
app.get('/blog/rss', rss.getFeed);

var blog = BlogRoute(ArticleService);
app.get('/blog', blog.getSummary);
app.get('/blog/:page', blog.getSummary);
app.get('/blog/category/:category', blog.getSummary);
app.get('/blog/category/:category/:page', blog.getSummary);
app.get('/blog/tag/:tag', blog.getSummary);
app.get('/blog/tag/:tag/:page', blog.getSummary);
app.get('/blog/:slug', blog.getArticle);
app.post('/blog/:slug/comment', blog.newComment);

// Error middleware
var error = ErrorRoute();
app.use(error.notFound);
app.use(error.serverError);
