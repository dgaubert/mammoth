// Module dependencies
var express = require('express')
  , params = require('express-params')
  , http = require('http')
  , path = require('path')
  , stylus = require('stylus')
  , home = require('./routes/home')
  , blog = require('./routes/blog');

var app = express();

// ---------- Error handler -----------

var notFound = function (req, res, next) {
  res.status(404);
  res.render('404', { url: req.url });
}

// Error handler occured into app.router
var errorHandler = function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('500', { error: err });
}

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  //app.use(express.favicon());
  app.use(express.logger('dev'));

  // shows error trace into error pages
  app.enable('verbose errors');
  // disable them in production
  // use $ NODE_ENV=production node app.js
  if ('production' == app.settings.env) {
    app.disable('verbose errors');
  }  
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(stylus.middleware({src: __dirname + '/public'}));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
  app.use(notFound);
  app.use(errorHandler);
});

// ---------- Router -----------

// Add parmam functionality
params.extend(app);

// Home
app.get('/', home.getHome);

// Blog
app.param('page', /^\d+$/);

app.get('/blog', blog.getSummary);
app.get('/blog/:page', blog.getSummary);

app.param('slug', /^[\w-]+$/);
app.get('/blog/post/:slug', blog.getPost);

// Error pages

app.get('/404', function(req, res, next){
  next();
});

app.get('/403', function(req, res, next){
  var err = new Error('not allowed!');
  err.status = 403;
  next(err);
});

app.get('/500', function(req, res, next){
  next(new Error('keyboard cat!'));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server listening on port " + app.get('port'));
});