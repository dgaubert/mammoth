/**
 * Module dependencies
 */
var mongoose = require('mongoose'), // DB driver
    db = mongoose.createConnection(require('../config').dbinfo), // DB conexion
    articleSchema = require('../models/article'), // Load schema
    Article = db.model('Article', articleSchema), // Load model
    RSS = require('rss'),
    feed = new RSS(require('../config').rssinfo);

/**
 * Retrieve a 'rss.xml' for blog syndication
 * 
 * @param  {Object}   req : request
 * @param  {Object}   res : response
 * @param  {Function} next : error handler
 * @return {Object}   XML
 */
exports.getXML = function (req, res, next) {
  Article.find({}, {}, function (err, blog) {
    var i,
        body;
    if (err) {
      next();
    } else {
      for (i = 0; i < blog.length; i++) {
        feed.item({
          title:  blog[i].title,
          description: blog[i].abstract,
          url: 'http://www.dguabert.com/blog/' + blog[i].slug,
          author: blog[i].author,
          date: blog[i].created
        });
      }
      body = feed.xml();
      res.writeHead(200, {
        'Content-Type': 'text/xml',
        'Content-Length': body.length
      });
      res.end(body);
    }
  });
};