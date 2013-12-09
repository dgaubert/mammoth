/**
 * Module dependencies
 */
var Feed = require('feed'),
    conf = require('../conf/rss'),
    parser = require('../utils/mdparser');

module.exports = function (ArticleService) {

  /**
   * Send a response with articles for blog syndication
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   * @return {Object}   XML
   */
  this.getFeed = function (req, res, next) {
    ArticleService.findAllPublished(function (err, articles) {
      var feed;

      if (err) {
        next(err);
      } else {
        feed = new Feed(conf);
        feed.category('programming');
        articles = parser(articles);
        
        for(var key in articles) {
          feed.item({
            title: articles[key].title,
            link: conf.link + articles[key].slug,
            description: articles[key].abstract,
            date: articles[key].created
          });
        }

        res.set('Content-Type', 'application/rss+xml');
        res.send(feed.render('rss-2.0'));
      }
    });
  };

};
