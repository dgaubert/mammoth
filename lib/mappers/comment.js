'use strict';

var sanitize = require('sanitizer').sanitize;

var commentMapper = {
  map: function map(comment, data) {
    comment.author = data.author;
    comment.created = data.created;
    comment.mail = data.mail;
    comment.comment = data.comment;

    return comment;
  },

  sanitizeData: function sanitizeData(data) {
    return {
      author: sanitize(data.author),
      created: sanitize(data.created),
      mail: sanitize(data.mail),
      comment: sanitize(data.comment).replace(/\n/g, '<br/>'),
    };
  }
};

module.exports = commentMapper;
