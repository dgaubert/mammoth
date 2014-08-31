/* jslint node: true */
'use strict';

var sanitize = require('sanitizer').sanitize;

var ArticleController = function (articleService) {
  this.articleService = articleService;
};

// private

ArticleController.prototype._sanitizeArticleData = function (data) {
  return {
    title: sanitize(data.title),
    author: sanitize(data.author),
    slug: sanitize(data.slug),
    category: sanitize(data.category),
    abstract: sanitize(data.abstract),
    content: sanitize(data.content),
    tags: sanitize(data.tags).split(','),
    published: data.published ? true : false
  };
};

// public

ArticleController.prototype.create = function (req, res, next) {
  var articleData = this._sanitizeArticleData(req.body);

  this.articleService.create(articleData, function createDone(err, article) {
    if (err) return next(err);

    res.redirect('/blog/admin/articles/' + article.slug);
  });
};

ArticleController.prototype.list = function (req, res, next) {
  this.articleService.list(function listDone(err, articles) {
    if (err) return next(err);

    res.render('blog/admin/articles', {
      title: 'Administración de artículos',
      section:'blog',
      articles: articles
    });
  });
};

ArticleController.prototype.retrieve = function (req, res, next) {
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

ArticleController.prototype.show = function (req, res) {
  res.render('blog/admin/article', {
    title: 'Nuevo artículo',
    section:'blog',
    article: undefined
  });
};

ArticleController.prototype.update = function (req, res, next) {
  var articleData = this._sanitizeArticleData(req.body);

  this.articleService.update(articleData, function updateArticleDone(err, article) {
    if (err) return next(err);

    res.redirect('/blog/admin/articles/' + article.slug);
  });
};

module.exports = ArticleController;