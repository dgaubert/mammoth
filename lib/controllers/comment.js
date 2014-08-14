/* jslint node: true */
'use strict';

var validator = require('../utils/validator');
var sanitize = require('sanitizer').sanitize;

function CommentController(ArticleService, CaptchaService) {

  // public

  function create(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;
    var comment = {
      author: sanitize(req.body.name),
      mail: sanitize(req.body.mail),
      created: new Date(),
      comment: sanitize(req.body.comment).replace(/\n/g, '<br/>')
    };
    var captchaValue = req.body.captcha;
    var captchaName = req.body.captchaName;

    var notValid = validator.validateComment(comment, captchaValue);
    if (notValid) {
      return res.send(500, notValid);
    }

    // validate captcha
    CaptchaService.findByValue(captchaValue, function findByValueDone(err, files) {
      if (err) {
        return next(err);
      }

      if (!files[0] || files[0].filename !== captchaName) {
        return res.send(500, 'No eres humano!!');
      }

      // everithing is ok
      ArticleService.findBySlug(slug, function done(err, article) {
        if (err) {
          return next(err);
        }

        article.comments.push(comment);
        article.save(function done(err) {
          if (err) {
            return res.send(500, 'Comentario no publicado');
          }

          res.send(200, 'Comentario publicado!. Recargando...');
        });
      });
    });
  }

  function list(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;

    ArticleService.findBySlug(slug, function done(err, article) {
      if (err) {
        return next(err);
      }
      res.render('blog/admin/comments', {
        title: 'Administración de comentarios',
        section:'blog',
        article: article
      });
    });
  }

  function remove(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;
    var commentId = req.params.commentId ? req.params.commentId[0] : null;

    ArticleService.findBySlug(slug, function done(err, article) {
      if (err) {
        return next(err);
      }
      var i;
      for (i = 0; i < article.comments.length; i++) {
        if (('' + article.comments[i]._id) === ('' + commentId)) {
          article.comments.splice(i, 1);
          break;
        }
      }

      article.save(function done(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/blog/admin/articles/' + slug + '/comments/');
      });
    });
  }

  // expose

  return {
    'create': create,
    'list': list,
    'remove': remove
  };
}

module.exports = CommentController;
