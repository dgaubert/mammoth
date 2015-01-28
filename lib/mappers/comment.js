'use strict';

var _ = require('lodash');
var BaseMapper = require('./base');

function CommentMapper() {}

CommentMapper.prototype = _.create(BaseMapper, {

  constructor: CommentMapper,

  map: function (input) {
    var data = {
      author: input.author,
      mail: input.mail,
      comment: input.comment
    };

    data = this.sanitize(data);

    data.comment = data.comment.replace(/\n/g, '<br/>');

    return data;
  }
});

module.exports = CommentMapper;
