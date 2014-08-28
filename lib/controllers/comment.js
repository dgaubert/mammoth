/* jslint node: true */
'use strict';

var async = require('async');

function CommentController(ArticleService, CaptchaService) {

  // public

  function create(slug, comment, captcha, callback) {

    var createCommentTasks = [

      // checks if captcha value is ok
      function captchaTask(callback) {
        CaptchaService.findByValue(captcha.value, function (err, captchas) {
          if (!captchas[0] || captchas[0].filename !== captcha.name) {
            return callback(new Error('No eres humano!!'));
          }

          callback(null);
        });
      },

      // finds article by its slug
      function findBySlugTask(callback) {
        ArticleService.findBySlug(slug, function (err, article) {
          if (err) {
            return callback(err);
          }

          if (!article) {
            return callback(new Error('Artículo no encontrado'));
          }

          callback(null, article);
        });
      },

      // saves comment inside of the article
      function saveComment(article, callback) {
        article.comments.push(comment);
        article.save(function saveCommentDone(err) {
          if (err) {
            return callback(err);
          }

          callback(null);
        });
      }
    ];

    async.waterfall(createCommentTasks, callback);
  }

  function list(slug, callback) {
    ArticleService.findBySlug(slug, function done(err, article) {
      if (err) {
        return callback(err);
      }
      callback(null, article.comments);
    });
  }

  function remove(slug, commentId, callback) {
    var removeCommentTasks = [

      // finds article by slug & removes the comment
      function getArticleTasks(callback) {
        ArticleService.findBySlug(slug, function findBySlugDone(err, article) {
          if (err) {
            return callback(err);
          }

          // search & remove the comment
          var i;
          for (i = 0; i < article.comments.length; i++) {
            if (('' + article.comments[i]._id) === ('' + commentId)) {
              article.comments.splice(i, 1);
              break;
            }
          }

          callback(null, article);
        });
      },

      // save the updated article
      function saveArticleTask(article, callback) {
        article.save(function done(err) {
          if (err) {
            return callback(err);
          }

          callback(null);
        });
      }
    ];

    async.waterfall(removeCommentTasks, callback);
  }

  // expose

  return {
    'create': create,
    'list': list,
    'remove': remove
  };
}

module.exports = CommentController;
