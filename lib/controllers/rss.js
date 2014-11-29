'use strict';

var di = require('di');
var RssService = require('../services/rss');
var Feed = require('feed');
var conf = require('../conf/rss');
var parser = require('../utils/mdparser');

var RssController = function RssController(rssService) {
  this.rssService = rssService;
};

RssController.prototype = {

  'list': function list(req, res, next) {
    this.rssService.list(function listDone(err, articles) {
      if (err) {
        return next(err);
      }

      var feed = new Feed(conf);

      feed.addCategory('programming');
      articles = parser(articles);
      for(var key in articles) {
        if (articles.hasOwnProperty(key)) {
          feed.addItem({
            title: articles[key].title,
            link: conf.link + articles[key].slug,
            description: articles[key].abstract,
            date: articles[key].created
          });
        }
      }

      res.set('Content-Type', 'application/rss+xml');
      res.send(feed.render('rss-2.0'));
    });
  }
};

di.annotate(RssController, new di.Inject(RssService));

module.exports = RssController;
