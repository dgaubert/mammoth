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
    guard = require('./utils/guard'),
    Article = require('./models/article'), // db model & service
    Summary = require('./models/summary'), // db model & service
    User = require('./models/user'); // db model & service

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
home.init(Summary);
app.get('/', home.getHome);

blog.init(Article, Summary);
app.get('/blog', blog.getSummary);
app.get('/blog/:page', blog.getSummary);
app.get('/blog/category/:category', blog.getSummary);
app.get('/blog/category/:category/:page', blog.getSummary);
app.get('/blog/tag/:tag', blog.getSummary);
app.get('/blog/tag/:tag/:page', blog.getSummary);
app.get('/blog/:slug', blog.getArticle);

comment.init(Article);
app.post('/blog/:slug/comment', comment.newComment);
app.get('/blog/admin/articles/:slug/comments', comment.getComments);
app.del('/blog/admin/articles/:slug/comments/:commentId', comment.deleteComment);

cloud.init(Summary);
app.get('/blog/word-cloud', cloud.getWords);

login.init(User);
app.get('/blog/login', login.getLogin);
app.get('/blog/logout', login.logout);
app.post('/blog/login', login.checkUser);

admin.init();
app.get('/blog/admin', admin.getAdmin);

user.init(User);
app.get('/blog/admin/users', user.getUsers);
app.get('/blog/admin/users/new', user.getNewUser);
app.post('/blog/admin/users/new', user.newUser);
app.get('/blog/admin/users/:username', user.getUser);
app.put('/blog/admin/users/:username', user.updateUser);

article.init(Article);
app.get('/blog/admin/articles', article.getArticles);
app.get('/blog/admin/articles/new', article.getNewArticle);
app.post('/blog/admin/articles/new', article.newArticle);
app.get('/blog/admin/articles/:slug', article.getArticle);
app.put('/blog/admin/articles/:slug', article.updateArticle);

rss.init(Article);
app.get('/blog/rss', rss.getFeed);

// Error middleware
app.use(error.notFound);
app.use(error.serverError);
