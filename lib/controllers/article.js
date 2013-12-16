module.exports = function (ArticleService, PictureService) {
  var Article = require('../models/article');
  var async = require('async');
  var pwd = require('pwd');

  var controller = {

    // retrieve a list of articles ordered descendent by date of creation
    getArticles: function getArticles(req, res, next) {
      ArticleService.findAll(function (err, articles) {
        if (err) {
          return next(err);
        }
        res.render('blog/admin/articles', {
          title: 'Administración de artículos',
          section:'blog',
          articles: articles
        });
      });
    },
    
    // retrieve a form to create a new article
    getNewArticle: function getNewArticle(req, res) {
      res.render('blog/admin/article', {
        title: 'Nuevo artículo',
        section:'blog',
        article: undefined
      });
    },
    
    // create a new article
    newArticle: function newArticle(req, res, next) {
      var slug = req.params.slug ? req.params.slug[0] : null;

      ArticleService.findBySlug(slug, function (err, article) {
        if (err) {
          return next(err);
        }
        if (article) {
          return next(new Error('The article already exists'));
        }
        // TODO: delegate population of article
        article = new Article();
        article.title = req.body.title;
        article.author = req.body.author;
        article.created = new Date();
        article.slug = req.body.slug;
        article.category = req.body.category;
        article.abstract = req.body.abstract;
        article.content = req.body.content;
        article.tags = req.body.tags.replace(/^\s+|\s+$/,'').split(',');
        article.published = req.body.published ? true : false;

        article.save(function (err) {
          if (err) {
            return next(err);
          }
          res.redirect('/blog/admin/articles/' + article.slug);
        });
      });
    },
    
    // retrieve the article by slug
    getArticle: function getArticle(req, res, next) {
      var slug = req.params.slug ? req.params.slug[0] : null;

      var tasks = {
        article: function (callback) {
          ArticleService.findBySlug(slug, callback);
        },
        pictures: function (callback) {
          PictureService.getPicturesByArticle(slug, callback);
        }
      };

      async.parallel(tasks, function (err, result) {
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
    },
    
    // update the article by title
    updateArticle: function updateArticle(req, res, next) {
      var slug = req.params.slug ? req.params.slug[0] : null;

      ArticleService.findBySlug(slug, function (err, article) {
        if (err) {
          return next(err);
        }
        // TODO: Delegate article population 
        article.title = req.body.title;
        article.author = req.body.author;
        article.slug = req.body.slug;
        article.category = req.body.category;
        article.abstract = req.body.abstract;
        article.content = req.body.content;
        article.tags = req.body.tags.replace(/^\s+|\s+$/,'').split(',');
        article.published = req.body.published ? true : false;
        // save the article
        article.save(function (err) {
          if (err) {
            return next(err);
          }
          res.redirect('/blog/admin/articles/' + article.slug);
        });
      });
    }
  };

  // expose
  return controller;
};
