'use strict';

var sanitize = require('sanitizer').sanitize;

var articleMapper = {
  map: function map(article, data) {
    article.title = data.title;
    article.author = data.author;
    article.slug = data.slug;
    article.category = data.category;
    article.abstract = data.abstract;
    article.content = data.content;
    article.tags = data.tags;
    article.published = data.published ? true : false;

    return article;
  },

  sanitizeData: function sanitizeData(data) {
    return {
      title: sanitize(data.title),
      author: sanitize(data.author),
      slug: sanitize(data.slug),
      category: sanitize(data.category),
      abstract: sanitize(data.abstract),
      content: sanitize(data.content),
      tags: sanitize(data.tags).split(','),
      published: data.published ? true : false
    };
  }
};

module.exports = articleMapper;
