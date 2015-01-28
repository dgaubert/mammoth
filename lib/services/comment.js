'use strict';

var di = require('di');
var _ = require('lodash');
var base = require('./base');
var ArticleDao = require('../dao/article.js');
var CaptchaDao = require('../dao/captcha.js');

function CommentService(articleDao, captchaDao) {
  this.dao = articleDao;
  this.captchaDao = captchaDao;
}

CommentService.prototype = _.create(base, {

  constructor: CommentService,

  create: function (slug, comment, captchaRequested) {
    var _this = this;

    return this.captchaDao.findByValue(captchaRequested.value)
      .then(function (captcha) {
        if (captcha.filename !== captchaRequested.filename) {
          throw new Error('No eres humano');
        }

        return _this.dao.findBySlug(slug)
          .then(function (article) {
            article.comments.push(comment);
            return _this.dao.save(article);
          });
      });
  },

  list: function (slug) {
    return this.dao.findBySlug(slug)
      .then(function (article) {
        return article.comments;
      });
  },

  remove: function (slug, commentId) {
    var _this = this;

    return this.dao.findBySlug(slug)
      .then(function (article) {
        article.comments.id(commentId).remove();
        return _this.dao.save(article);
      });
  }

});

di.annotate(CommentService, new di.Inject(ArticleDao, CaptchaDao));

module.exports = CommentService;
