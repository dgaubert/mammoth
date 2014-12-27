'use strict';

var di = require('di');
var CommentService = require('../services/comment');
var validator = require('../utils/validator');
var commentMapper = require('../mappers/comment');
var captchaMapper = require('../mappers/captcha');

var CommentController = function CommentController(commentService) {
  this.commentService = commentService;
};

CommentController.prototype = {

  'create': function create(req, res) {
    var slug = req.params.slug;
    var captcha = captchaMapper.sanitizeData(req.body);
    var comment = commentMapper.sanitizeData(req.body);

    var commentError = validator.validateComment(comment, captcha.value);
    if (commentError) {
      return res.send(500, commentError);
    }

  this.commentService.create(slug, comment, captcha, function createCommentDone(err /*,comment*/) {
      if (err) {
        return res.send(500, 'Comentario no publicado');
      }

      res.send(200, 'Comentario publicado!. Recargando...');
    });
  },

  'list': function list(req, res, next) {
    var slug = req.params.slug;

    this.commentService.list(slug, function listCommentsDone(err, comments) {
      if (err) {
        return next(err);
      }

      res.render('blog/admin/comments', {
        title: 'Administración de comentarios',
        section:'blog',
        slug: slug,
        comments: comments
      });
    });
  },

  'remove': function remove(req, res, next) {
    var slug = req.params.slug;
    var commentId = req.params.commentId;

    this.commentService.remove(slug, commentId, function removeCommentDone(err, article) {
      if (err) {
        return next(err);
      }

      res.redirect('/blog/admin/articles/' + article.slug + '/comments/');
    });
  }
};

di.annotate(CommentController, new di.Inject(CommentService));

module.exports = CommentController;
