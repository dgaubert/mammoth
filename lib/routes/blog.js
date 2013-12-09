/**
 * Module dependencies
 */
var async = require('async'), // Control flow
    Paginator = require('../utils/paginator'), // Pagination
    parser = require('../utils/mdparser'),
    challenger = require('../utils/challenger'),
    validator = require('../utils/validator');

module.exports = function (ArticleService) {

  /**
   * Retrieve a blog summary
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   * @return {Object}   blog summary
   */
  this.getSummary = function (req, res, next) {
    var page = parseInt(req.params.page, 10) || 0,
        category = req.params.category,
        tag = req.params.tag,
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
        console.log('err');
        next(err);
      } else if (!blog.articles.length) {
        console.log('no');
        next();
      } else {
        res.render('blog/blog', {
          title: 'Blog - Daniel García Aubert',
          section:'blog',
          articles: parser(blog.articles),
          pagination: new Paginator(page, blog.count)
        });
      }
    });

  };
  
  /**
   * Retrieve the article by the slug 
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   * @return {Object}   view of the article
   */
  this.getArticle =  function (req, res, next) {
    var slug = req.params.slug || '',
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
      if (err || !blog.article) {
        next();
      } else {
        ArticleService.findByCategory('' + blog.article.category, function (err, similars) {
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
      }
    });
  };

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
        },
        challenge = {
          id: req.body.challengeId,
          option: {
            value: req.body.challengeValue
          }
        },
        error;

    error = validator.validateComment(comment, challenge);

    if (error) {
      res.send(500, error);
    } else {
      ArticleService.findBySlug(slug, function (err, article) {
        if (err) {
          next(err);
        } else {
          article.comments.push(comment);
          article.save(function (err) {
            if (err) {
              res.send(500, 'Comment not saved');
            } else {
              res.send(200, 'Comment saved!. Reloading...');
            }
          });
        }
      });
    }
  };

};
