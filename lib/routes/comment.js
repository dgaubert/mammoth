/* jslint node: true */
'use strict';

var validator = require('../utils/validator');
var sanitize = require('sanitizer').sanitize;

function CommentRoute(CommentController) {

  // public

  function create(req, res, next) {
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
    if (commentError) {
      return res.send(500, commentError);
    }

    CommentController.create(slug, comment, captcha, function createCommentDone(err, comment) {
      if (err) {
        return res.send(500, 'Comentario no publicado');
      }

      res.send(200, 'Comentario publicado!. Recargando...');
    });
  }

  function list(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;

    CommentController.list(slug, function listCommentsDone(err, comments) {
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
  }

  function remove(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;
    var commentId = req.params.commentId ? req.params.commentId[0] : null;

    CommentController.remove(slug, commentId, function removeCommentDone(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/blog/admin/articles/' + slug + '/comments/');
    });

  }

  // expose

  return {
    'create': create,
    'list': list,
    'remove': remove
  };
}

module.exports = CommentRoute;
