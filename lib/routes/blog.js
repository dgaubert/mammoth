/**
 * Module dependencies
 */
var async = require('async'), // Control flow
    Paginator = require('../utils/paginator'), // Pagination
    parser = require('../utils/mdparser'),
    nospam = require('../utils/nospam');

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
        filter = {'published': true};

    if (category) {
      filter = {'published': true, 'category': category};
    } else if (tag) {
      filter = {'published': true, 'tags': {$in: tag}};
    }

    var tasks = {
      articles: function (callback) {
        Article.find(filter)
          .sort({created: -1})
          .skip(page * 10)
          .limit((page * 10) + 10)
          .exec(callback);
      },
      count: function (callback) {
        Article.find(filter)
          .count(callback);
      }
    };

    var done = function (err, blog) {
      if (err || blog.articles.length <= 0) {
        next();
      } else {
        res.render('blog/blog', {
          title: 'Blog - Daniel García Aubert',
          section:'blog',
          articles: parser(blog.articles),
          pagination: new Paginator(page, blog.count)
        });
      }
    };

    async.parallel(tasks, done);

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
    var slug = req.params.slug || '';

    var tasks = {
      article: function (callback) {
        Article.findOne({'slug': slug})
          .exec(callback);
      },
      categories: function (callback) {
        Article.categoriesCount(callback);
      }
    };

    var done = function (err, blog) {
      if (err || !blog.article) {
        next();
      } else {
        Article.find({'published': true, 'category': blog.article.category})
          .select({'_id': -1, 'title': 1, 'slug': 1})
          .exec(function (err, similars) {
              res.render('blog/article', {
                title: blog.article.title + ' - Blog - Daniel García Aubert',
                section:'blog',
                article: parser(blog.article),
                categories: blog.categories[0],
                challenge: nospam.getChallenge(),
                similars: similars
              });
          });
      }
    };

    async.parallel(tasks, done);
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
        answer = {
          id: req.body.challengeId,
          option: {
            value: req.body.challengeValue
          }
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
          res.send(200);
        });
      }
    };

    if (isValidComment(comment, answer)) {
      Article.findOne({'slug': slug})
        .exec(done);
    } else {
      res.send(500);
    }

  };

  this.validateComment = function (comment, answer) {
    if()

  };

  this.isHuman = function (answer) {
    var valid = false,
        challenges = nospam.getChallenges();

    for (var i = 0; i < challenges.length; i++) {
      if (challenges[i].id == answer.id) {
        for (var j = 0; j < challenges[i].options.length; j++) {
          if (challenges[i].options[j].value === answer.option.value && challenges[i].options[j].valid) {
            valid = true;
          }
        }
      }
    }

    return valid;

  };

    
};
