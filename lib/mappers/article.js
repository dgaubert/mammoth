'use strict';

var _ = require('lodash');
var BaseMapper = require('./base');

function ArticleMapper() {}

ArticleMapper.prototype = _.create(BaseMapper, {

  constructor: ArticleMapper,

  map: function (input) {
    var data = this.sanitize(input);

    console.log(data.published);

    data.tags = data.tags.split(',');
    data.published = data.published === 'on' ? true : false;

    console.log(data.published);

    return data;
  }
});

module.exports = ArticleMapper;
