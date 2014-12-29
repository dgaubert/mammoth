'use strict';

var di = require('di');
var _ = require('lodash');
var BaseRoutes = require('./base.routes');
var RssController = require('../controllers/rss');

function RssRoutes(rssController) {
  this.controller = _.bindAll(rssController);
}

RssRoutes.prototype = _.create(BaseRoutes, {
  get: function () {
    return {
      '/': {
        get: this.controller.list
      }
    };
  }
});

di.annotate(RssRoutes, new di.Inject(RssController));

module.exports = RssRoutes;
