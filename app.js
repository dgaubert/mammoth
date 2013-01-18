// Module dependencies
var express = require('express')
  , params = require('express-params')
  , http = require('http')
  , path = require('path')
  , stylus = require('stylus')
  , home = require('./routes/home')
  , blog = require('./routes/blog');

var app = express();

// **
// Setup
// **

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(stylus.middleware({src: __dirname + '/public'}));
app.use(express.static(path.join(__dirname, 'public')));

// Development enviroment
app.configure('development', function(){
  // shows error trace into error pages
  app.enable('verbose errors');
})

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
app.param('slug', /^[\w-]+$/);
app.get('/blog/:slug', blog.getPost);
app.post('/blog/:slug/comment', blog.newComment);

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
http.createServer(app).listen(app.get('port'), function(){
  console.log("Server listening on port " + app.get('port'));
});
