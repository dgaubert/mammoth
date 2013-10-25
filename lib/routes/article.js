/**
 * Module dependencies
 */
var pwd = require('pwd');

module.exports = function (Article) {

  /**
   * Retrieve a list of articles ordered descendent by date of creation
   * 
   * @param  {Object} req : request
   * @param  {Object} res : response
   * @return {Object} view with the list of the articles
   */
  this.getArticles = function (req, res, next) {
    var done = function (err, articles) {
      if (err) { 
        next();
      } else {
        res.render('blog/admin/articles', {
          title: 'Administración de artículos',
          section:'blog',
          articles: articles
        });
      }
    };

    Article.findAll({}, {title: 1, slug: 1, created: 1}, {created:-1}, done);
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

    var done = function (err, articles) {

      if (err || articles.length > 0) {
        next(new Error('The article already exists'));
      } else {
        
        /* TODO delegate to other module to populate the article */
        var article = new Article();
        article.title = req.body.title;
        article.author = req.body.author;
        article.created = new Date();
        article.slug = req.body.slug;
        article.category = req.body.category;
        article.abstract = req.body.abstract;
        article.content = req.body.content;
        article.tags = req.body.tags.replace(/^\s+|\s+$/,'').split(',');

        var saved = function (err) {
          if (err) {
            next(new Error('The article hasn\'t been created'));
          } else {
            res.redirect('/blog/admin/articles/' + article.slug);
          }
        };

        article.save(saved);
      }
    };

    Article.findAll({username: req.body.slug}, {slug: 1}, {}, done);
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

    var done = function (err, articles) {
      if (err) {
        next();
      } else {
        res.render('blog/admin/article', {
          title: 'Edición de artículo',
          section:'blog',
          article: articles[0]
        });
      }
    };

    Article.findAll({slug: req.params.slug}, {}, {}, done);
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

    var done = function (err, articles) {
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

        var updated = function (err) {
          if (err) {
            next(new Error('Can\'t update the article'));
          } else {
            res.redirect('/blog/admin/articles/' + article.slug);
          }
        };

        article.save(updated);
      }
    };

    Article.findAll({slug: req.params.slug}, {}, {}, done);
  };
  
};
