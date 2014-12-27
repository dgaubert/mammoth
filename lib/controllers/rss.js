'use strict';

var di = require('di');
var RssService = require('../services/rss');
var Feed = require('feed');
var conf = require('../conf/rss');
var parser = require('../utils/mdparser');

function RssController(rssService) {
  this.service = rssService;
}

RssController.prototype = {

  list: function (req, res, next) {
    this.service.list()
      .then(function (articles) {
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
      })
      .fail(function (err) {
        next(err);
      });

  }
};

di.annotate(RssController, new di.Inject(RssService));

module.exports = RssController;
