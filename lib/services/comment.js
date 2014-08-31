/* jslint node: true */
'use strict';

var async = require('async');

module.exports = function commentService(articleDao, captchaDao) {
  // private

  // checks if captcha value is ok
  function checkCaptchaValue(captcha, callback) {
    captchaDao.findByValue(captcha.value, function (err, captchas) {
      if (!captchas[0] || captchas[0].filename !== captcha.name) {
        return callback(new Error('No eres humano!!'));
      }

      callback(null);
    });
  }

  // finds article by its slug
  function findArticleBySlug(slug, comment, callback) {
    articleDao.findBySlug(slug, function (err, article) {
      if (err) return callback(err);
      if (!article) return callback(new Error('Artículo no encontrado'));

      callback(null, comment, article);
    });
  }

  // saves comment inside of the article
  function saveComment(comment, article, callback) {
    article.comments.push(comment);
    article.save(callback);
  }

  function removeCommentFromArticle(article, commentId) {

    // search & remove the comment
    var i;
    for (i = 0; i < article.comments.length; i++) {
      if (('' + article.comments[i]._id) === ('' + commentId)) {
        console.log('removed');
        article.comments.splice(i, 1);
        break;
      }
    }

    return article;
  }

  // finds article by slug & removes the comment
  function getArticleAndRemoveComment(slug, commentId, callback) {
    articleDao.findBySlug(slug, function findArticleBySlugDone(err, article) {
      if (err) return callback(err);

      callback(null, article, commentId);
    });
  }

  // save the article with the comment removed
  function saveArticle(article, commentId, callback) {
    article = removeCommentFromArticle(article, commentId);
    article.save(function saveArticleDone(err, article) {
      if (err) return callback(err);

      callback(null, article);
    });
  }

  // public

  function create(slug, comment, captcha, callback) {
    async.waterfall([
        checkCaptchaValue.bind(null, captcha),
        findArticleBySlug.bind(null, slug, comment),
        saveComment
      ],
      callback);
  }

  function list(slug, callback) {
    articleDao.findBySlug(slug, function done(err, article) {
      if (err) return callback(err);

      callback(null, article.comments);
    });
  }

  function remove(slug, commentId, callback) {
    async.waterfall([
        getArticleAndRemoveComment.bind(null, slug, commentId),
        saveArticle
      ],
      callback);
  }

  // expose

  return {
    'create': create,
    'list': list,
    'remove': remove
  };
};
