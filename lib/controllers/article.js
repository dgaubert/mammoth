var Article = require('../models/article');
var async = require('async');
var pwd = require('pwd');

function articleController(ArticleService, PictureService) {

  // retrieve a list of articles ordered descendent by date of creation
  function getArticles(req, res, next) {

    ArticleService.find(function done(err, articles) {
      if (err) {
        return next(err);
      }
      res.render('blog/admin/articles', {
        title: 'Administración de artículos',
        section:'blog',
        articles: articles
      });
    });
  }
  
  // retrieve a form to create a new article
  function getNewArticle(req, res) {
    res.render('blog/admin/article', {
      title: 'Nuevo artículo',
      section:'blog',
      article: undefined
    });
  }

  function createAndPopulateArticle(data) {
    return new Article({
      title: data.title,
      author: data.author,
      slug: data.slug,
      category: data.category,
      abstract: data.abstract,
      content: data.content,
      tags: data.tags.split(','),
      published: data.published ? true : false
    });
  }

  function populateArticle(article, data) {
    article.title = data.title;
    article.author = data.author;
    article.slug = data.slug;
    article.category = data.category;
    article.abstract = data.abstract;
    article.content = data.content;
    article.tags = data.tags.split(',');
    article.published = data.published ? true : false;

    return article;
  }

  // create a new article
  function newArticle(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;

    ArticleService.findBySlug(slug, function done(err, article) {
      if (err) {
        return next(err);
      }
      if (article) {
        return next(new Error('The article already exists'));
      }

      article = createAndPopulateArticle(req.body);

      article.save(function done(err) {
        if (err) {
          return next(err);
        }

        res.redirect('/blog/admin/articles/' + article.slug);
      });
    });
  }

  // retrieve the article by slug
  function getArticle(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;

    var tasks = {
      article: function findArticlesBySlugTask(callback) {
        ArticleService.findBySlug(slug, callback);
      },
      pictures: function findPicturesByArticleTask(callback) {
        PictureService.findByArticle(slug, callback);
      }
    };

    async.parallel(tasks, function done(err, result) {
      if (err) {
        return next(err);
      }
      res.render('blog/admin/article', {
        title: 'Edición de artículo',
        section:'blog',
        article: result.article,
        pictures: result.pictures
      });
    });
  }

  // update the article by title
  function updateArticle(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;

    ArticleService.findBySlug(slug, function done(err, article) {
      if (err) {
        return next(err);
      }
      if(!article) {
        return next(new Error('The article doesn\'t exists'));
      }

      article = populateArticle(article, req.body);

      // save the article
      article.save(function done(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/blog/admin/articles/' + article.slug);
      });
    });
  }

  // public
  return {
    'getArticles': getArticles,
    'getNewArticle': getNewArticle,
    'newArticle': newArticle,
    'getArticle': getArticle,
    'updateArticle': updateArticle
  };

}

module.exports = articleController;
