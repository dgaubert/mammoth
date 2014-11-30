'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var RssController = require('../controllers/rss');

var RssRoutes = function RssRoutes(rssController) {
  this.rssController = _.bindAll(rssController);
};

RssRoutes.prototype = _.create(BaseRoutes, {
  get: function get() {
    return {
      '/': {
        get: this.rssController.list
      }
    };
  }
});

di.annotate(RssRoutes, new di.Inject(RssController));

module.exports = RssRoutes;
