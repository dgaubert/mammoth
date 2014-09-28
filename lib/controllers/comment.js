/* jslint node: true */
'use strict';

var validator = require('../utils/validator');
var sanitize = require('sanitizer').sanitize;

var CommentController = function CommentController(commentService) {
  this.commentService = commentService;
};

CommentController.prototype = {

  // public

  'create': function create(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;
    var captcha = {
      value: sanitize(req.body.captcha),
      name: sanitize(req.body.captchaName)
    };
    var comment = {
      author: sanitize(req.body.name),
      mail: sanitize(req.body.mail),
      created: new Date(),
      comment: sanitize(req.body.comment).replace(/\n/g, '<br/>')
    };

    var commentError = validator.validateComment(comment, captcha.value);
    if (commentError) return res.send(500, commentError);

    this.commentService.create(slug, comment, captcha, function createCommentDone(err, comment) {
      if (err) return res.send(500, 'Comentario no publicado');

      res.send(200, 'Comentario publicado!. Recargando...');
    });
  },

  'list': function list(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;

    this.commentService.list(slug, function listCommentsDone(err, comments) {
      if (err) return next(err);

      res.render('blog/admin/comments', {
        title: 'Administración de comentarios',
        section:'blog',
        slug: slug,
        comments: comments
      });
    });
  },

  'remove': function remove(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;
    var commentId = req.params.commentId ? req.params.commentId[0] : null;

    this.commentService.remove(slug, commentId, function removeCommentDone(err, article) {
      if (err) return next(err);

      res.redirect('/blog/admin/articles/' + article.slug + '/comments/');
    });
  }
};

module.exports = CommentController;
