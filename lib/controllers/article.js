var Article = require('../models/article');
var async = require('async');
var pwd = require('pwd');

function ArticleController(ArticleService, PictureService) {

  // private

  function createAndPopulate(data) {
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

  function populate(article, data) {
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

  // public

  function create(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;

    ArticleService.findBySlug(slug, function done(err, article) {
      if (err) {
        return next(err);
      }
      if (article) {
        return next(new Error('The article already exists'));
      }

      article = createAndPopulate(req.body);

      article.save(function done(err) {
        if (err) {
          return next(err);
        }

        res.redirect('/blog/admin/articles/' + article.slug);
      });
    });
  }

  function list(req, res, next) {

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

  function retrieve(req, res, next) {
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
  
  function show(req, res) {
    res.render('blog/admin/article', {
      title: 'Nuevo artículo',
      section:'blog',
      article: undefined
    });
  }

  function update(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;

    ArticleService.findBySlug(slug, function done(err, article) {
      if (err) {
        return next(err);
      }
      if(!article) {
        return next(new Error('The article doesn\'t exists'));
      }

      article = populate(article, req.body);

      article.save(function done(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/blog/admin/articles/' + article.slug);
      });
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

module.exports = ArticleController;
