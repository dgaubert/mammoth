/**
 * Module dependencies
 */
var async = require('async'), // Control flow
    Paginator = require('../utils/paginator'), // Pagination
    parser = require('../utils/mdparser'),
    challenger = require('../utils/challenger'),
    validator = require('../utils/validator');

module.exports = function (Article) {

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
        filter = {
          published: true
        },
        tasks;

    if (category) {
      filter = {
        'published': true,
        'category': category
      };
    } else if (tag) {
      filter = {
        'published': true,
        'tags': {$in: tag}
      };
    }

    tasks = {
      articles: function (callback) {
        Article
          .find(filter)
          .sort({
            created: -1
          })
          .skip(page * 10)
          .limit((page * 10) + 10)
          .exec(callback);
      },
      count: function (callback) {
        Article
          .find(filter)
          .count(callback);
      }
    };

    async.parallel(tasks, function (err, blog) {
      if (err || !blog.articles.length) {
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
        Article
          .findOne({
            slug: slug
          })
          .exec(callback);
      },
      categories: function (callback) {
        Article.categoriesCount(callback);
      },
      tags: function (callback) {
        Article.tagsCount(callback);
      },
      lasts: function (callback) {
        Article
          .find()
          .select({
            _id: -1,
            title: 1,
            slug: 1
          })
          .sort({
            created: -1
          })
          .limit(3)
          .exec(callback);
      }
    };

    async.parallel(tasks, function (err, blog) {
      if (err || !blog.article) {
        next();
      } else {
        Article
          .find({
            published: true,
            category: blog.article.category
          })
          .select({
            _id: -1,
            title: 1,
            slug: 1
          })
          .exec(function (err, similars) {
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
      Article
        .findOne({
          slug: slug
        })
        .exec(function (err, article) {
          if (err) {
            next();
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
