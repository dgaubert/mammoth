
/**
 * Module dependencies.
 */

var express = require('express')
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
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(stylus.middleware({ src: __dirname + '/public' }));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/** Home **/
app.get('/', home.view);

/** Blog **/
app.get('/blog', blog.view);
app.get('/blog/titles', blog.titles);
app.get('/blog/tags', blog.tags);
//app.get('/blog/:id', blog.view);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server listening on port " + app.get('port'));
});
