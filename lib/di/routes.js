var AdminRoutes = require('../routes/admin');
var ArticleRoutes = require('../routes/article');
var BlogRoutes = require('../routes/blog');
var CaptchaRoutes = require('../routes/captcha');
var CommentRoutes = require('../routes/comment');
var HomeRoutes = require('../routes/home');
var LoginRoutes = require('../routes/login');
var PictureRoutes = require('../routes/picture');
var RssRoutes = require('../routes/rss');
var UserRoutes = require('../routes/user');

// Warning: order is important!
module.exports = [
  LoginRoutes,
  HomeRoutes,
  AdminRoutes,
  ArticleRoutes,
  CommentRoutes,
  CaptchaRoutes,
  PictureRoutes,
  UserRoutes,
  RssRoutes,
  BlogRoutes
];
