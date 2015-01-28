'use strict';

var di = require('di');
var _ = require('lodash');
var BaseController = require('./base');
var CommentService = require('../services/comment');
var CommentMapper = require('../mappers/comment');
var CaptchaMapper = require('../mappers/captcha');
var validator = require('../utils/validator');

function CommentController(commentService, commentMapper, captchaMapper) {
  this.commentMapper = commentMapper;
  this.captchaMapper = captchaMapper;
  this.service = commentService;
  this.path = '/blog/admin/comments/';
  this.template = 'blog/admin/comment';
  this.templateList = 'blog/admin/comments';
  this.defaultTemplateContext = {
    title: 'Administración de comentarios',
    section: 'blog',
    entity: undefined,
    entities: undefined
  };

}

CommentController.prototype = _.create(BaseController, {

  constructor: CommentController,

  create: function (req, res) {
    var slug = req.params.slug;
    var comment = this.commentMapper.map(req.body);
    var captcha = this.captchaMapper.map(req.body);

    var commentError = validator.validateComment(comment, captcha);
    if (commentError) {
      return res.status(500)
        .send(commentError);
    }

    this.service.create(slug, comment, captcha)
      .then(function () {
        res.status(200)
          .send('Comentario publicado!. Recargando...');
      })
      .fail(function (err) {
        res.status(500)
          .send('Comentario no publicado ' + err.message);
      });
  },

  list: function (req, res, next) {
    var _this = this;
    var slug = req.params.slug;

    this.service.list(slug)
      .then(function (comments) {
        _this.renderTemplateList(res, {
          slug: slug,
          entities: comments
        });
      })
      .fail(function (err) {
        next(err);
      });
  },

  remove: function (req, res, next) {
    var slug = req.params.slug;
    var commentId = req.params.commentId;

    this.service.remove(slug, commentId)
      .then(function (article) {
        res.redirect('/blog/admin/articles/' + article.slug + '/comments/');
      })
      .fail(function (err) {
        next(err);
      });
  }
});

di.annotate(CommentController, new di.Inject(CommentService, CommentMapper, CaptchaMapper));

module.exports = CommentController;
