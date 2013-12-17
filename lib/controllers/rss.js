var rssController = function rssController(ArticleService) {
  var Feed = require('feed');
  var conf = require('../conf/rss');
  var parser = require('../utils/mdparser');

  var controller = {

    // Send a response with articles for blog syndication
    getFeed: function getFeed(req, res, next) {
      ArticleService.findAllPublished(function findAllPublishedDone(err, articles) {
        if (err) {
          return next(err);
        }
        
        var feed = new Feed(conf);
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

  return controller;
};

module.exports = rssController;
