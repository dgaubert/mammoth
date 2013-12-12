/**
 * Commnet Router
 */
module.exports = function (ArticleService) {
  
  return {
    /**
     * Get the article's comments
     * 
     * @param  {Object}   req   :   request
     * @param  {Object}   res   :   response
     * @param  {Function} next  :   Error handler
     * @return {Object}   view with the list of the articles
     */
    getComments: function (req, res, next) {
      var slug = req.params.slug ? req.params.slug[0] : null;

      ArticleService.findBySlug(slug, function (err, article) {
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
    
    /**
     * Remove a comment from the article
     * 
     * @param  {Object}   req   :   request
     * @param  {Object}   res   :   response
     * @param  {Function} next  :   Error handler
     * @return {Object}   redirect
     */
    deleteComment: function (req, res, next) {
      var slug = req.params.slug ? req.params.slug[0] : null,
          commentId = req.params.commentId ? req.params.commentId[0] : null;

      ArticleService.findBySlug(slug, function (err, article) {
        var i;
        if (err) {
          return next(err);
        }
        for (i = 0; i < article.comments.length; i++) {
          if (('' + article.comments[i]._id) === ('' + commentId)) {
            article.comments.splice(i, 1);
            break;
          }
        }
          
        article.save(function (err) {
          if (err) {
            return next(err);
          }
          res.redirect('/blog/admin/articles/' + slug + '/comments/');
        });
      });
    }
  };
};
