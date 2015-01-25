'use strict';

var base = require('./base');
var _ = require('lodash');

function ArticleMapper() {}

ArticleMapper.prototype = _.extend(base, {
  map: function (data) {
    data = this.sanitize(data);

    data.tags = data.tags.split(',');
    data.published = data.published ? true : false;

    return data;
  }
});

module.exports = ArticleMapper;
