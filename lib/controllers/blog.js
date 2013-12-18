var async = require('async');
var Paginator = require('../utils/paginator');
var parser = require('../utils/mdparser');
var challenger = require('../utils/challenger');
var validator = require('../utils/validator');

function blogController(ArticleService) {

  // Retrieve a blog summary
  function getSummary(req, res, next) {
    var page = parseInt(req.params.page, 10) || 0;
    var category = req.params.category ? req.params.category[0] : null;
    var tag = req.params.tag ? [req.params.tag[0]] : null;
    
    var tasks = {
      articles: function articlesTask(callback) {
        ArticleService.findPublishedByCategoryOrTag(category, tag, page, callback);
      },
      count: function countTask(callback) {
        ArticleService.countPublishedByCategoryOrTag(category, tag, callback);
      }
    };

    var tasksDone = function tasksDone(err, blog) {
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
    };

    async.parallel(tasks, tasksDone);
  }

  function getArticle(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;

    var tasks = {
      article: function findArticleBySlugTask(callback) {
        ArticleService.findBySlug(slug, callback);
      },
      categories: function countArticleCategoriesTask(callback) {
        ArticleService.countCategories(callback);
      },
      tags: function countArticleTagsTask(callback) {
        ArticleService.countTags(callback);
      },
      lasts: function findLastThreeArticlesTask(callback) {
        ArticleService.findLastThree(callback);
      }
    };

    var tasksDone = function tasksDone(err, blog) {
      if (err) {
        return next(err);
      }
      if (!blog.article) {
        return next();
      }

      function findByCategoryDone(err, similars) {
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
      }

      var category = blog.article.category;
      ArticleService.findByCategory(category, findByCategoryDone);
    };

    async.parallel(tasks, tasksDone);
  }

  // create a comment of the article
  function newComment(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;
    var comment = {
      author: req.body.name,
      mail: req.body.mail,
      created: new Date(),
      comment: req.body.comment.replace(/\n/g, '<br/>')
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
      article.save(function saveDone(err) {
        if (err) {
          return res.send(500, 'Comment not saved');
        }
        res.send(200, 'Comment saved!. Reloading...');
      });
    });
  }

  // public
  return {
    'getSummary': getSummary,
    'getArticle': getArticle,
    'newComment': newComment
  };
}

module.exports = blogController;
