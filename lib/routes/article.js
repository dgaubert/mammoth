module.exports = function (ArticleService, PictureService) {
  var Article = require('../models/article'),
      async = require('async'),
      pwd = require('pwd');

  return {

    /**
     * Retrieve a list of articles ordered descendent by date of creation
     * 
     * @param  {Object} req : request
     * @param  {Object} res : response
     * @return {Object} view with the list of the articles
     */
    getArticles: function (req, res, next) {
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
    
    /**
     * Retrieve a form to create a new article
     * 
     * @param  {Object} req : request
     * @param  {Object} res : response
     * @return {Object} view of article's form 
     */
    getNewArticle: function (req, res) {
      res.render('blog/admin/article', {
        title: 'Nuevo artículo',
        section:'blog',
        article: undefined
      });
    },
    
    /**
     * Create a new article
     * 
     * @param  {Object} req : request
     * @param  {Object} res : response
     */
    newArticle: function (req, res, next) {
      var slug = req.params.slug ? req.params.slug[0] : null;

      ArticleService.findBySlug(slug, function (err, article) {
        if (err) {
          return next(err);
        }
        if (article) {
          return next(new Error('The article already exists'));
        }
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
            return next(err);
          }
          res.redirect('/blog/admin/articles/' + article.slug);
        });
      });
    },
    
    /**
     * Retrieve the article by slug
     * 
     * @param  {Object}   req : request
     * @param  {Object}   res : response
     * @param  {Function} next : error handler
     * @return {Object}   view of the article
     */
    getArticle: function (req, res, next) {
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
    
    /**
     * Update the article by title
     * 
     * @param  {Object}   req : request
     * @param  {Object}   res : response
     * @param  {Function} next : error handler
     * @return {[type]}
     */
    updateArticle: function (req, res, next) {
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
        // Save the article
        article.save(function (err) {
          if (err) {
            return next(err);
          }
          res.redirect('/blog/admin/articles/' + article.slug);
        });
      });
    }
  };
};
