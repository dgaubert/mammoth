'use strict';

var di = require('di');
var CommentService = require('../services/comment');
var validator = require('../utils/validator');
var commentMapper = require('../mappers/comment');
var captchaMapper = require('../mappers/captcha');

function CommentController(commentService) {
  this.service = commentService;
}

CommentController.prototype = {

  constructor: CommentController,

  create: function (req, res) {
    var slug = req.params.slug;
    var captcha = captchaMapper.sanitizeData(req.body);
    var comment = commentMapper.sanitizeData(req.body);

    var commentError = validator.validateComment(comment, captcha.value);
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
        return res.status(500)
          .send('Comentario no publicado ' + err.message);
      });
  },

  list: function (req, res, next) {
    var slug = req.params.slug;

    this.service.list(slug)
      .then(function (comments) {
        res.render('blog/admin/comments', {
          title: 'Administración de comentarios',
          section: 'blog',
          slug: slug,
          comments: comments
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
};

di.annotate(CommentController, new di.Inject(CommentService));

module.exports = CommentController;
