var ArticleService = require('../services/article-service');

module.exports = function (Article) {
  
  /**
   * Get the article's comments
   * 
   * @param  {Object}   req   :   request
   * @param  {Object}   res   :   response
   * @param  {Function} next  :   Error handler
   * @return {Object}   view with the list of the articles
   */
  this.getComments = function (req, res, next) {
    var slug = '' + req.params.slug;

    ArticleService.findBySlug(slug, function (err, article) {
      if (err) {
        next();
      } else {
        res.render('blog/admin/comments', {
          title: 'Administración de comentarios',
          section:'blog',
          article: article
        });
      }
    });
  };
  
  /**
   * Remove a comment from the article
   * 
   * @param  {Object}   req   :   request
   * @param  {Object}   res   :   response
   * @param  {Function} next  :   Error handler
   * @return {Object}   redirect
   */
  this.deleteComment = function (req, res, next) {
    var slug = req.params.slug || '',
        commentId = req.params.commentId || '';

    ArticleService.findBySlug(slug, function (err, article) {
      var i;

      if (err) {
        next(err);
      } else {
        for (i = 0; i < article.comments.length; i++) {
          if (('' + article.comments[i]._id) === ('' + commentId)) {
            article.comments.splice(i, 1);
            break;
          }
        }
        
        article.save(function (err) {
          if (err) {
            next(err);
          } else {
            res.redirect('/blog/admin/articles/' + slug + '/comments/');
          }
        });
      }
    });
  };
  
};
