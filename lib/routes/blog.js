/**
 * Module dependencies
 */
var async = require('async'), // Control flow
    Paginator = require('../utils/paginator'), // Pagination
    parser = require('../utils/mdparser'),
    challenger = require('../utils/challenger'),
    validator = require('../utils/validator');

module.exports = function (ArticleService) {

  return {

    /**
     * Retrieve a blog summary
     * 
     * @param  {Object}   req : request
     * @param  {Object}   res : response
     * @param  {Function} next : error handler
     * @return {Object}   blog summary
     */
    getSummary: function (req, res, next) {
      var page = parseInt(req.params.page, 10) || 0,
          category = req.params.category ? req.params.category[0] : null,
          tag = req.params.tag ? [req.params.tag[0]] : null,
          tasks;

      tasks = {
        articles: function (callback) {
          ArticleService.findPublishedByCategoryOrTag(category, tag, page, callback);
        },
        count: function (callback) {
          ArticleService.countPublishedByCategoryOrTag(category, tag, callback);
        }
      };

      async.parallel(tasks, function (err, blog) {
        if (err) {
          return next(err);
        }
        if (!blog.articles.length) {
          return next(new Error ('No articles found'));
        }
        res.render('blog/blog', {
          title: 'Blog - Daniel García Aubert',
          section:'blog',
          articles: parser(blog.articles),
          pagination: new Paginator(page, blog.count)
        });
      });
    },
    
    /**
     * Retrieve the article by the slug 
     * 
     * @param  {Object}   req : request
     * @param  {Object}   res : response
     * @param  {Function} next : error handler
     * @return {Object}   view of the article
     */
    getArticle:  function (req, res, next) {
      var slug = req.params.slug ? req.params.slug[0] : null,
          tasks;

      tasks = {
        article: function (callback) {
          ArticleService.findBySlug(slug, callback);
        },
        categories: function (callback) {
          ArticleService.categoriesCount(callback);
        },
        tags: function (callback) {
          ArticleService.tagsCount(callback);
        },
        lasts: function (callback) {
          ArticleService.findLastThree(callback);
        }
      };
      async.parallel(tasks, function (err, blog) {
        if (err) {
          return next(err);
        }
        if (!blog.article) {
          return next();
        }
        ArticleService.findByCategory(blog.article.category, function (err, similars) {
          if (err) {
            return next(err);
          }
          res.render('blog/article', {
            title: blog.article.title + ' - Blog - Daniel García Aubert',
            section:'blog',
            article: parser(blog.article),
            categories: blog.categories[0],
            tags: blog.tags[0],
            lasts: blog.lasts,
            challenge: challenger.getChallenge(),
            similars: similars
          });
        });
      });
    },

    /**
     * Create a comment of the article
     * 
     * @param  {Object}   req : request
     * @param  {Object}   res : response
     * @param  {Function} next : error handler
     */
    newComment: function (req, res, next) {
      var slug = req.params.slug ? req.params.slug[0] : null,
          comment = {
            author: req.body.name,
            mail: req.body.mail,
            created: new Date(),
            comment: req.body.comment.replace(/\n/g, '<br/>')
          },
          challenge = {
            id: req.body.challengeId,
            option: {
              value: req.body.challengeValue
            }
          };

      var notValid = validator.validateComment(comment, challenge);
      if (notValid) {
        return res.send(500, notValid);
      }

      ArticleService.findBySlug(slug, function (err, article) {
        if (err) {
          return next(err);
        }
        article.comments.push(comment);
        article.save(function (err) {
          if (err) {
            return res.send(500, 'Comment not saved');
          }
          res.send(200, 'Comment saved!. Reloading...');
        });
      });
    }
  };
};
