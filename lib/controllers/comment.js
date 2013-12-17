var commentController = function commentController(ArticleService) {
  
  var controller = {
    
    // Get the article's comments
    getComments: function getComments(req, res, next) {
      var slug = req.params.slug ? req.params.slug[0] : null;

      ArticleService.findBySlug(slug, function findBySlugDone(err, article) {
        if (err) {
          return next(err);
        }
        res.render('blog/admin/comments', {
          title: 'Administración de comentarios',
          section:'blog',
          article: article
        });
      });
    },
    
    // Remove a comment from the article
    deleteComment: function deleteComment(req, res, next) {
      var slug = req.params.slug ? req.params.slug[0] : null;
      var commentId = req.params.commentId ? req.params.commentId[0] : null;

      ArticleService.findBySlug(slug, function findBySlugDone(err, article) {
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
          
        article.save(function saveDone(err) {
          if (err) {
            return next(err);
          }
          res.redirect('/blog/admin/articles/' + slug + '/comments/');
        });
      });
    }
  };

  return controller;
};

module.exports = commentController;
