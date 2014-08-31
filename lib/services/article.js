/* jslint node: true */
'use strict';

var Article = require('../models/article');
var async = require('async');

module.exports = function articleService(articleDao, pictureDao) {

  // private

  function createAndPopulate(data) {
    var article = new Article();

    return populate(article, data);
  }

  function populate(article, data) {
    article.title = data.title;
    article.author = data.author;
    article.slug = data.slug;
    article.category = data.category;
    article.abstract = data.abstract;
    article.content = data.content;
    article.tags = data.tags;
    article.published = data.published ? true : false;

    return article;
  }

  // checks if article already exists
  function checkArticleExist(data, callback) {
    articleDao.findBySlug(data.slug, function findArticleBySlugDone(err, article) {
      if (err) return callback(err);
      if (article) return callback(new Error('The article already exists'));

      article = createAndPopulate(data);
      callback(null, article);
    });
  }

  // get the article to update
  function getArticle(data, callback) {
    articleDao.findBySlug(data.slug, function findArticleBySlugDone(err, article) {
      if (err) return callback(err);
      if(!article) return callback(new Error('The article doesn\'t exists'));

      article = populate(article, data);
      callback(null, article);
    });
  }

  // save the article (new or not)
  function saveArticle(article, callback) {
    article.save(function saveArticleDone(err, article) {
      if (err) return callback(err);

      callback(null, article);
    });
  }

  // public

  function create(data, callback) {
    async.waterfall([
        checkArticleExist.bind(null, data),
        saveArticle
      ],
      callback);
  }

  function list(callback) {
    articleDao.find(callback);
  }

  function retrieve(slug, callback) {
    async.parallel({
        article: async.apply(articleDao.findBySlug, slug),
        pictures: async.apply(pictureDao.findByArticle, slug)
      },
      callback);
  }

  function update(data, callback) {
    async.waterfall([
        getArticle.bind(null, data),
        saveArticle
      ],
      callback);
  }

  // expose

  return {
    'create': create,
    'list': list,
    'retrieve': retrieve,
    'update': update
  };
};
