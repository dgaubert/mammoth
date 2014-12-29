'use strict';

var di = require('di');
var ArticleService = require('../services/article');
var articleMapper = require('../mappers/article');

function ArticleController(articleService) {
  this.service = articleService;
}

ArticleController.prototype = {

  create: function (req, res, next) {
    var articleData = articleMapper.sanitizeData(req.body);

    this.service.create(articleData)
      .then(function (article) {
        res.redirect('/blog/admin/articles/' + article.slug);
      })
      .fail(function (err) {
        next(err);
      });
  },

  list: function (req, res, next) {
    this.service.list()
      .then(function (articles) {
        res.render('blog/admin/articles', {
          title: 'Administración de artículos',
          section:'blog',
          articles: articles
        });
      })
      .fail(function (err) {
        next(err);
      });
  },

  retrieve: function (req, res, next) {
    var slug = req.params.slug;

    this.service.retrieve(slug)
      .then(function (result) {
        res.render('blog/admin/article', {
          title: 'Edición de artículo',
          section:'blog',
          article: result.article,
          pictures: result.pictures
        });
      })
      .fail(function (err) {
        next(err);
      });
    },

  show: function (req, res) {
    res.render('blog/admin/article', {
      title: 'Nuevo artículo',
      section:'blog',
      article: undefined
    });
  },

  update: function (req, res, next) {
    var articleData = articleMapper.sanitizeData(req.body);

    this.service.update(articleData)
      .then(function (article) {
        res.redirect('/blog/admin/articles/' + article.slug);
      })
      .fail(function (err) {
        next(err);
      });
  }
};

di.annotate(ArticleController, new di.Inject(ArticleService));

module.exports = ArticleController;
