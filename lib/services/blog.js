/* jslint node: true */
'use strict';

var async = require('async');

module.exports = function blogService(articleDao, captchaDao) {

  // private

  function getArticleWithExtraBlogInfo(slug, callback) {
    async.parallel({
        article: async.apply(articleDao.findBySlug, slug),
        categories: async.apply(articleDao.countCategories),
        tags: async.apply(articleDao.countTags),
        lasts: async.apply(articleDao.findLastThree),
        captcha: async.apply(captchaDao.count)
      },
      callback);
  }

  // gets article and the info about it
  function getArticle(slug, callback) {
    getArticleWithExtraBlogInfo(slug, function getArticleWithExtraBlogInfoDone(err, blog) {
      if (err) return callback(err);

      blog.captcha = Math.ceil(Math.random() * (blog.captcha)) + '.png';
      callback(null, blog);
    });
  }

  // finds articles with the same category
  function findSimilarArticles(blog, callback) {
    var category = blog.article.category;

    articleDao.findByCategory(category, function findArticlesByCategoryDone(err, similars) {
      if (err) return callback(err);

      blog.similars = similars;
      callback(null, blog);
    });

  }

  // public

  function retrieve(slug, callback) {
    async.waterfall([
        getArticle.bind(null, slug),
        findSimilarArticles
      ],
      callback);
  }

  function list(page, category, tag, callback) {
    async.parallel({
        articles: async.apply(articleDao.findPublishedByCategoryOrTag, category, tag, page),
        count: async.apply(articleDao.countPublishedByCategoryOrTag, category, tag)
      },
      callback);
  }

  // expose

  return {
    'list': list,
    'retrieve': retrieve
  };
};
