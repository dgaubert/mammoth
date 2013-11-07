module.exports = function (Article) {

  /**
   * Create a comment of the article
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   */
  this.newComment = function (req, res, next) {
    var slug = req.params.slug || '',
        comment = {
          author: req.body.name,
          mail: req.body.mail,
          created: new Date(),
          comment: req.body.comment.replace(/\n/g, '<br/>')
        };

    var done = function (err, article) {
      if (err) {
        next();
      } else {
        article.comments.push(comment);
        article.save(function (err) {
          if (err) {
            next(new Error('Save comment fails'));
          }
          res.redirect('/blog/' + slug + '#lastCommnent');
        });
      }
    };

    Article.findOne({'slug': slug})
      .exec(done);
  };
  
  /**
   * Get the article's comments
   * 
   * @param  {Object}   req   :   request
   * @param  {Object}   res   :   response
   * @param  {Function} next  :   Error handler
   * @return {Object}   view with the list of the articles
   */
  this.getComments = function (req, res, next) {
    var slug = req.params.slug || '';

    var done = function (err, article) {
      if (err) {
        next();
      } else {
        res.render('blog/admin/comments', {
          title: 'Administración de comentarios',
          section:'blog',
          article: article
        });
      }
    };

    Article.findOne({'slug': slug})
      .exec(done);
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

    var done = function (err, article) {
      var i;
      if (err) {
        next();
      } else {
        for (i = 0; i < article.comments.length; i++) {
          if (('' + article.comments[i]._id) === ('' + commentId)) {
            article.comments.splice(i, 1);
            break;
          }
        }
        article.save(function (err) {
          if (err) {
            next(new Error('Can\'t delete the comment'));
          } else {
            res.redirect('/blog/admin/articles/' + slug + '/comments/');
          }
        });
      }
    };

    Article.findOne({'slug': slug})
      .exec(done);

  };
  
};
