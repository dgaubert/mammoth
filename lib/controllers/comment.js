var validator = require('../utils/validator');
var Sanitizer = require('sanitizer');

function CommentController(ArticleService) {

  // public

  function create(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;
    var comment = {
      author: Sanitizer.sanitize(req.body.name),
      mail: Sanitizer.sanitize(req.body.mail),
      created: new Date(),
      comment: Sanitizer.sanitize(req.body.comment).replace(/\n/g, '<br/>')
    };
    var challenge = {
      id: req.body.challengeId,
      option: {
        value: req.body.challengeValue
      }
    };

    var notValid = validator.validateComment(comment, challenge);
    if (notValid) {
      return res.send(500, notValid);
    }

    ArticleService.findBySlug(slug, function done(err, article) {
      if (err) {
        return next(err);
      }
      
      article.comments.push(comment);
      article.save(function done(err) {
        if (err) {
          return res.send(500, 'Comment not saved');
        }

        res.send(200, 'Comment saved!. Reloading...');
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
