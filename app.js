/** Dependencies **/
var express = require('express')
  , params = require('express-params')
  , http = require('http')
  , path = require('path')
  , stylus = require('stylus')
  , home = require('./routes/home')
  , blog = require('./routes/blog');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(stylus.middleware({src: __dirname + '/public'}));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/** Add parmam functionality **/
params.extend(app);

/** Home **/
app.get('/', home.view);

/** Blog **/
app.param('page', /^\d+$/);
app.get('/blog', blog.list);
app.get('/blog/:page', blog.list);

app.param('slug', /^[\w-]+$/);
app.get('/blog/post/:slug', blog.view);

app.param('category', /^[\w-]+$/);
app.get('/blog/category/:category', blog.list);

app.param('tag', /^[\w-]+$/);
app.get('/blog/tag/:tag', blog.list);

app.get('/blog/filter/titles', blog.titles);
app.get('/blog/filter/categories', blog.categories);
app.get('/blog/filter/tags', blog.tags);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server listening on port " + app.get('port'));
});
