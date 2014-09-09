/* jslint node: true */
'use strict';

var articleMapper = require('../mappers/article');

var ArticleController = function ArticleController(articleService) {
  this.articleService = articleService;
};

// public

ArticleController.prototype.create = function create(req, res, next) {
  var articleData = articleMapper.sanitizeData(req.body);

  this.articleService.create(articleData, function createDone(err, article) {
    if (err) return next(err);

    res.redirect('/blog/admin/articles/' + article.slug);
  });
};

ArticleController.prototype.list = function list(req, res, next) {
  this.articleService.list(function listDone(err, articles) {
    if (err) return next(err);

    res.render('blog/admin/articles', {
      title: 'Administración de artículos',
      section:'blog',
      articles: articles
    });
  });
};

ArticleController.prototype.retrieve = function retrieve(req, res, next) {
  var slug = req.params.slug ? req.params.slug[0] : null;

  this.articleService.retrieve(slug, function retrieveDone(err, result) {
    if (err) return next(err);

    res.render('blog/admin/article', {
      title: 'Edición de artículo',
      section:'blog',
      article: result.article,
      pictures: result.pictures
    });
  });
};

ArticleController.prototype.show = function show(req, res) {
  res.render('blog/admin/article', {
    title: 'Nuevo artículo',
    section:'blog',
    article: undefined
  });
};

ArticleController.prototype.update = function update(req, res, next) {
  var articleData = articleMapper.sanitizeData(req.body);

  this.articleService.update(articleData, function updateArticleDone(err, article) {
    if (err) return next(err);

    res.redirect('/blog/admin/articles/' + article.slug);
  });
};

module.exports = ArticleController;
