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
home(app, Summary);
blog(app, Article, Summary);
comment(app);
cloud(app, Summary);
login(app, User);
admin(app);
user(app, User);
article(app, Article);
rss(app, Article);

// Error middleware
app.use(error.notFound);
app.use(error.serverError);
