/* jslint node: true */
'use strict';

function ArticleRoute(ArticleController) {

  // public

  function create(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;
    var data = req.body;

    ArticleController.create(data, slug, function createDone(err, article) {
      if (err) {
        return next(err);
      }

      res.redirect('/blog/admin/articles/' + article.slug);
    });
  }

  function list(req, res, next) {

    ArticleController.list(function listDone(err, articles) {
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

  function retrieve(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;

    ArticleController.retrieve(slug, function retrieveDone(err, result) {
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

  function show(req, res) {
    res.render('blog/admin/article', {
      title: 'Nuevo artículo',
      section:'blog',
      article: undefined
    });
  }

  function update(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;
    var data = req.body;

    ArticleController.update(data, slug, function updateArticleDone(err, article) {
      if (err) {
        return next(err);
      }

      res.redirect('/blog/admin/articles/' + article.slug);
    });
  }

  // expose

  return {
    'create': create,
    'list': list,
    'retrieve': retrieve,
    'show': show,
    'update': update
  };

}

module.exports = ArticleRoute;
