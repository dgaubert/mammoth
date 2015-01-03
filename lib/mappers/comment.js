'use strict';

var base = require('./base');
var _ = require('lodash');

function CommentMapper() {
}

CommentMapper.prototype = _.extend(base, {
  map: function (data) {
    data = this.sanitize(data);

    data.comment = data.comment.replace(/\n/g, '<br/>');

    return data;
  }
});

module.exports = CommentMapper;
