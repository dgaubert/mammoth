/* jslint node: true */
'use strict';

var async = require('async');
var Paginator = require('../utils/paginator');
var parser = require('../utils/mdparser');

function BlogController(ArticleService, CaptchaService) {

  // private

  function getArticle(slug, callback) {
    var getArticleTasks = {
      article: async.apply(ArticleService.findBySlug, slug),
      categories: async.apply(ArticleService.countCategories),
      tags: async.apply(ArticleService.countTags),
      lasts: async.apply(ArticleService.findLastThree),
      captcha: async.apply(CaptchaService.count)
    };

    async.parallel(getArticleTasks, callback);
  }

  // public

  function retrieve(slug, callback) {

    var retrieveTasks = [

      //
      function getArticleTask(callback) {
        getArticle(slug, function getArticleTasksDone(err, blog) {
          if (err) {
            return callback(err);
          }

          blog.captcha = Math.ceil(Math.random() * (blog.captcha)) + '.png';
          callback(null, blog);
        });
      },

      //
      function getSimilarsTask(blog, callback) {
        var category = blog.article.category;

        ArticleService.findByCategory(category, function findByCategoryDone(err, similars) {
          if (err) {
            return callback(err);
          }

          blog.similars = similars;
          callback(null, blog);
        });

      }
    ];

    async.waterfall(retrieveTasks, callback);
  }

  function list(page, category, tag, callback) {
    var listTasks = {
      articles: async.apply(ArticleService.findPublishedByCategoryOrTag, category, tag, page),
      count: async.apply(ArticleService.countPublishedByCategoryOrTag, category, tag)
    };

    async.parallel(listTasks, callback);
  }

  // expose

  return {
    'list': list,
    'retrieve': retrieve
  };
}

module.exports = BlogController;
