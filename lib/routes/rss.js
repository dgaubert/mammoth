/* jslint node: true */
'use strict';

var Feed = require('feed');
var conf = require('../conf/rss');
var parser = require('../utils/mdparser');

function RssRoute(RssController) {

  // public

  function list(req, res, next) {

    RssController.list(function listDone(err, articles) {
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

  // expose

  return {
    'list': list
  };
}

module.exports = RssRoute;
