'use strict';

var di = require('di');
var dao = require('../dao/article.js');
var CaptchaDao = require('../dao/captcha.js');

function CommentService(dao, captchaDao) {
  this.dao = dao;
  this.captchaDao = captchaDao;
}

CommentService.prototype = {

  create: function (slug, comment, captchaRequested) {
    var _this = this;

    return this.captchaDao.findByValue(captchaRequested.value)
      .then(function (captcha) {
        if (captcha.filename !== captchaRequested.name) {
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

};

di.annotate(CommentService, new di.Inject(dao, CaptchaDao));

module.exports = CommentService;
