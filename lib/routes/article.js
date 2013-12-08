/**
 * Module dependencies
 */
var async = require('async'), // Control flow
    pwd = require('pwd'),
    ArticleService = require('../services/article-service');

module.exports = function (Article, Picture) {

  /**
   * Retrieve a list of articles ordered descendent by date of creation
   * 
   * @param  {Object} req : request
   * @param  {Object} res : response
   * @return {Object} view with the list of the articles
   */
  this.getArticles = function (req, res, next) {
    ArticleService.findAll(function (err, articles) {
      if (err) {
        next(err);
      } else {
        res.render('blog/admin/articles', {
          title: 'Administración de artículos',
          section:'blog',
          articles: articles
        });
      }
    });
  };
  
  /**
   * Retrieve a form to create a new article
   * 
   * @param  {Object} req : request
   * @param  {Object} res : response
   * @return {Object} view of article's form 
   */
  this.getNewArticle = function (req, res) {
    res.render('blog/admin/article', {
      title: 'Nuevo artículo',
      section:'blog',
      article: undefined
    });
  };
  
  /**
   * Create a new article
   * 
   * @param  {Object} req : request
   * @param  {Object} res : response
   */
  this.newArticle = function (req, res, next) {
    ArticleService.findBySlug('' + req.params.slug, function (err, article) {
      if (err || article) {
        next(new Error('The article already exists'));
      } else {
        /* TODO: delegate population of article */
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
            next(new Error('The article hasn\'t been created'));
          } else {
            res.redirect('/blog/admin/articles/' + article.slug);
          }
        });
      }
    });
  };
  
  /**
   * Retrieve the article by slug
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   * @return {Object}   view of the article
   */
  this.getArticle = function (req, res, next) {

    var tasks = {
      article: function (callback) {
        ArticleService.findBySlug('' + req.params.slug, callback);
      },
      pictures: function (callback) {
        Picture.getPicturesByArticle('' + req.params.slug, callback);
      }
    };

    async.parallel(tasks, function (err, result) {
      if (err) {
        next(err);
      } else {
        res.render('blog/admin/article', {
          title: 'Edición de artículo',
          section:'blog',
          article: result.article,
          pictures: result.pictures
        });
      }
    });
  };
  
  /**
   * Update the article by title
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   * @return {[type]}
   */
  this.updateArticle = function (req, res, next) {
    ArticleService.findBySlug('' + req.params.slug, function (err, article) {
      if (err) {
        next(new Error('The article with the given slug doesn\'t exist'));
      } else {
        // TODO: Delegate article population 
        article.title = req.body.title;
        article.author = req.body.author;
        article.slug = req.body.slug;
        article.category = req.body.category;
        article.abstract = req.body.abstract;
        article.content = req.body.content;
        article.tags = req.body.tags.replace(/^\s+|\s+$/,'').split(',');
        article.published = req.body.published ? true : false;
        // Save the article
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
};
