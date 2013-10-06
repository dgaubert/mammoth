var Feed = require('feed'),
    conf = require('../conf/rss');

var Rss = function (Article) {

  /**
   * Retrieve a 'rss.xml' for blog syndication
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   * @return {Object}   XML
   */
  this.getFeed = function (req, res, next) {
    Article.findAll({created: -1}, function (err, articles) {
      if (err) {
        next();
      } else {
        res.set('Content-Type', 'application/rss+xml');
        res.send(createFeed(articles).render('rss-2.0'));
      }
    });
  };

  /**
   * Build a Feed
   *
   * @param  {[]} articles : blog's articles
   * @return {Object} Feed with the properties
   */
  var createFeed = this.createFeed = function (articles) {
    var feed = new Feed(conf);

    feed.category('programming');
    for(var key in articles) {
      feed.item({
        title: articles[key].title,
        link: conf.link + articles[key].slug,
        description: articles[key].abstract,
        date: articles[key].created
      });
    }
    return feed;
  };

};

// /**
//  * Build a Feed
//  *
//  * @param  {[]} articles : blog's articles
//  * @return {Object} Feed with the properties
//  */
// var createFeed = function (articles) {
//   var feed = new Feed(conf);

//   feed.category('programming');
//   for(var key in articles) {
//     feed.item({
//       title: articles[key].title,
//       link: conf.link + articles[key].slug,
//       description: articles[key].abstract,
//       date: articles[key].created
//     });
//   }
//   return feed;
// };

module.exports = Rss;
