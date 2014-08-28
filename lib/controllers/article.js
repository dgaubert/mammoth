/* jslint node: true */
'use strict';

var Article = require('../models/article');
var async = require('async');
var sanitize = require('sanitizer').sanitize;

function ArticleController(ArticleService, PictureService) {

  // private

  function createAndPopulate(data) {
    return new Article({
      title: sanitize(data.title),
      author: sanitize(data.author),
      slug: sanitize(data.slug),
      category: sanitize(data.category),
      abstract: sanitize(data.abstract),
      content: sanitize(data.content),
      tags: sanitize(data.tags).split(','),
      published: data.published ? true : false
    });
  }

  function populate(article, data) {
    article.title = sanitize(data.title);
    article.author = sanitize(data.author);
    article.slug = sanitize(data.slug);
    article.category = sanitize(data.category);
    article.abstract = sanitize(data.abstract);
    article.content = sanitize(data.content);
    article.tags = sanitize(data.tags).split(',');
    article.published = data.published ? true : false;

    return article;
  }

  // public

  function create(data, slug, callback) {
    var createArticleTasks = [

      // checks if article exists
      function findBySlugTask(callback) {
        ArticleService.findBySlug(slug, function findBySlugTaskDone(err, article) {
          if (err) {
            return callback(err);
          }
          if (article) {
            return callback(new Error('The article already exists'));
          }

          article = createAndPopulate(data);

          callback(null, article);
        });
      },

      // save article
      function saveArticleTask(article, callback) {
        article.save(function saveArticleDone(err) {
          if (err) {
            return callback(err);
          }

          callback(null);
        });
      }
    ];

    async.waterfall(createArticleTasks, callback);
  }

  function list(callback) {
    ArticleService.find(callback);
  }

  function retrieve(slug, callback) {
    var retrieveTasks = {
      article: async.apply(ArticleService.findBySlug, slug),
      pictures: async.apply(PictureService.findByArticle, slug)
    };

    async.parallel(retrieveTasks, callback);
  }

  function update(data, slug, callback) {
    var updateTasks = [

      // get the article to update
      function getArticleTask(callback) {
        ArticleService.findBySlug(slug, function findBySlugDone(err, article) {
          if (err) {
            return callback(err);
          }

          if(!article) {
            return callback(new Error('The article doesn\'t exists'));
          }

          callback(null, populate(article, data));
        });
      },

      // save the article
      function (article, callback) {
        article.save(function saveDone(err) {
          if (err) {
            return callback(err);
          }

          callback(null, article);
        });
      }
    ];

    async.waterfall(updateTasks, callback);
  }

  // expose

  return {
    'create': create,
    'list': list,
    'retrieve': retrieve,
    'update': update
  };

}

module.exports = ArticleController;
