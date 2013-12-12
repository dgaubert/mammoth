/**
 * RSS route
 * 
 * @param  {Object} Article Service
 */
module.exports = function (ArticleService) {
  var Feed = require('feed'),
      conf = require('../conf/rss'),
      parser = require('../utils/mdparser');

  return {

    /**
     * Send a response with articles for blog syndication
     * 
     * @param  {Object}   req : request
     * @param  {Object}   res : response
     * @param  {Function} next : error handler
     * @return {Object}   XML
     */
    getFeed: function (req, res, next) {
      ArticleService.findAllPublished(function (err, articles) {
        var feed;

        if (err) {
          return next(err);
        }
        
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
      });
    }
  };
};
