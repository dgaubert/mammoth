/**
 * Module dependencies
 */
var mongoose = require('mongoose'), // DB driver
    db = mongoose.createConnection(require('../config').dbinfo), // DB conexion
    articleSchema = require('../models/article'), // Load schema
    Article = db.model('Article', articleSchema), // Load model
    rssinfo = require('../config').rssinfo,
    Feed = require('feed');

/**
 * Retrieve a 'rss.xml' for blog syndication
 * 
 * @param  {Object}   req : request
 * @param  {Object}   res : response
 * @param  {Function} next : error handler
 * @return {Object}   XML
 */
exports.getFeed = function (req, res, next) {
  Article.find({}, {}, function (err, articles) {
    if (err) {
      next();
    } else {
      var feed = new Feed(rssinfo);
      for(var key in articles) {
        feed.item({
          title: articles[key].title,
          link: rssinfo.link + articles[key].slug,
          description: articles[key].abstract,
          date: articles[key].created
        });
      }
      // Setting the appropriate Content-Type
      res.set('Content-Type', 'application/rss+xml');
      // Sending the feed as a response
      res.send(feed.render('rss-2.0'));
    }
  });
};