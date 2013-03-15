var mongoose = require('mongoose'), // DB driver
    db = mongoose.createConnection('mongodb://localhost/mammoth'), // DB conexion
    postSchema = require('../models/post'), // Load schema
    Post = db.model('Post', postSchema), // Load model
    pwd = require('pwd');

exports.getArticles = function (req, res) {
  Post.find({}, {title: 1, slug: 1, created: 1})
    .sort({created:-1})
    .execFind(function (err, articles) {
      res.render('articles', {
        title: 'Administración de artículos',
        section:'blog',
        articles: articles
      });
  });
};

// Article

exports.getNewArticle = function (req, res) {
  res.render('article', {
    title: 'Nuevo artículo',
    section:'blog',
    article: undefined
  });
};

exports.newArticle = function (req, res) {
  Post.find({username: req.body.slug}, {slug: 1}, function (err, articles) {
    if (err || articles.length > 0) {
      next(new Error('The article already exists'));
    } else {
      var article = new Post();
      article.title = req.body.title;
      article.author = req.body.author;
      article.created = new Date();
      article.slug = req.body.slug;
      article.category = req.body.category;
      article.abstract = req.body.abstract;
      article.content = req.body.content;
      article.tags = req.body.tags.replace(/^\s+|\s+$/,'').split(',');
      article.save(function (err) {
        if (err) {
          next(new Error('The article hasn\'t been created'));
        } else {
          res.redirect('/blog/admin/articles/' + article.slug);
        }
      });
    }
  });
};

exports.getArticle = function (req, res, next) {
  Post.find({slug: req.params.slug}, function (err, articles) {
    if (err) {
      next();
    } else {
      res.render('article', {
        title: 'Edición de artículo',
        section:'blog',
        article: articles[0]
      });
    }
  });
};

exports.updateArticle = function (req, res, next) {
  Post.find({slug: req.params.slug}, function (err, articles) {
    var article = articles[0];
    if (err) {
      next(new Error('The article with the given slug doesn\'t exist'));
    } else {
      article.title = req.body.title;
      article.author = req.body.author;
      article.slug = req.body.slug;
      article.category = req.body.category;
      article.abstract = req.body.abstract;
      article.content = req.body.content;
      article.tags = req.body.tags.replace(/^\s+|\s+$/,'').split(',');
      article.save(function (err) {
        if (err) {
          next(new Error('Can\'t update the article'));
        } else {
          res.redirect('/blog/admin/articles/' + article.slug);
        }
      });
    }
  });
};