'use strict';

var di = require('di');
var ArticleService = require('../services/article');
var articleMapper = require('../mappers/article');

var ArticleController = function ArticleController(articleService) {
  this.articleService = articleService;
};

ArticleController.prototype = {

  // public

  'create': function create(req, res, next) {
    var articleData = articleMapper.sanitizeData(req.body);

    this.articleService.create(articleData, function createDone(err, article) {
      if (err) {
        return next(err);
      }

      res.redirect('/blog/admin/articles/' + article.slug);
    });
  },

  'list': function list(req, res, next) {
    this.articleService.list(function listDone(err, articles) {
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

  'retrieve': function retrieve(req, res, next) {
    var slug = req.params.slug;

    this.articleService.retrieve(slug, function retrieveDone(err, result) {
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

  'show': function show(req, res) {
    res.render('blog/admin/article', {
      title: 'Nuevo artículo',
      section:'blog',
      article: undefined
    });
  },

  'update': function update(req, res, next) {
    var articleData = articleMapper.sanitizeData(req.body);

    this.articleService.update(articleData, function updateArticleDone(err, article) {
      if (err) {
        return next(err);
      }

      res.redirect('/blog/admin/articles/' + article.slug);
    });
  }
};

di.annotate(ArticleController, new di.Inject(ArticleService));

module.exports = ArticleController;
