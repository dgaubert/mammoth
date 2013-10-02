module.exports = function (app, Article) {

  var rssConf = require('../conf/rss'),
      Feed = require('feed');

  /**
   * Build a Feed
   *
   * @param  {[]} articles : blog's articles
   * @return {Object} Feed with the properties
   */
  var createFeed = function (articles) {
    var feed = new Feed(rssConf);

    feed.category('programming');
    for(var key in articles) {
      feed.item({
        title: articles[key].title,
        link: rssConf.link + articles[key].slug,
        description: articles[key].abstract,
        date: articles[key].created
      });
    }
    return feed;
  };
  
  /**
   * Retrieve a 'rss.xml' for blog syndication
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   * @return {Object}   XML
   */
  var getFeed = function (req, res, next) {
    Article.find({}).sort({created: -1}).exec(function (err, articles) {
      if (err) {
        next();
      } else {
        res.set('Content-Type', 'application/rss+xml');
        res.send(createFeed(articles).render('rss-2.0'));
      }
    });
  };

  app.get('/blog/rss', getFeed);
  
};
