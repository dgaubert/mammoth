/* jslint node: true */
'use strict';

var async = require('async');

var CommentService = function CommentService(articleDao, captchaDao) {
  this.articleDao = articleDao;
  this.captchaDao = captchaDao;
};

// private

// checks if captcha value is ok
CommentService.prototype._checkCaptchaValue = function _checkCaptchaValue(captcha, callback) {
  this.captchaDao.findByValue(captcha.value, function (err, captchas) {
    if (!captchas[0] || captchas[0].filename !== captcha.name) {
      return callback(new Error('No eres humano!!'));
    }

    callback(null);
  });
};

// finds article by its slug
CommentService.prototype._findArticleBySlug = function _findArticleBySlug(slug, comment, callback) {
  this.articleDao.findBySlug(slug, function (err, article) {
    if (err) return callback(err);
    if (!article) return callback(new Error('Artículo no encontrado'));

    callback(null, comment, article);
  });
};

// saves comment inside of the article
CommentService.prototype._saveComment = function _saveComment(comment, article, callback) {
  article.comments.push(comment);
  article.save(callback);
};

CommentService.prototype._removeCommentFromArticle = function _removeCommentFromArticle(article, commentId) {

  // search & remove the comment
  var i;
  for (i = 0; i < article.comments.length; i++) {
    if (('' + article.comments[i]._id) === ('' + commentId)) {
      article.comments.splice(i, 1);
      break;
    }
  }

  return article;
};

// finds article by slug & removes the comment
CommentService.prototype._getArticleAndRemoveComment = function _getArticleAndRemoveComment(slug, commentId, callback) {
  this.articleDao.findBySlug(slug, function _findArticleBySlugDone(err, article) {
    if (err) return callback(err);

    callback(null, article, commentId);
  });
};

// save the article with the comment removed
CommentService.prototype._saveArticle = function _saveArticle(article, commentId, callback) {
  article = this._removeCommentFromArticle(article, commentId);
  article.save(function _saveArticleDone(err, article) {
    if (err) return callback(err);

    callback(null, article);
  });
};

// public

CommentService.prototype.create = function create(slug, comment, captcha, callback) {
  async.waterfall([
      this._checkCaptchaValue.bind(this, captcha),
      this._findArticleBySlug.bind(this, slug, comment),
      this._saveComment
    ],
    callback);
};

CommentService.prototype.list = function list(slug, callback) {
  this.articleDao.findBySlug(slug, function done(err, article) {
    if (err) return callback(err);

    callback(null, article.comments);
  });
};

CommentService.prototype.remove = function remove(slug, commentId, callback) {
  async.waterfall([
      this._getArticleAndRemoveComment.bind(this, slug, commentId),
      this._saveArticle.bind(this)
    ],
    callback);
};

module.exports = CommentService;
