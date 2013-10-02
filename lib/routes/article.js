module.exports.init = function (Article) {

  /**
   * Module dependencies
   */
  var pwd = require('pwd');

  /**
   * Retrieve a list of articles ordered descendent by date of creation
   * 
   * @param  {Object} req : request
   * @param  {Object} res : response
   * @return {Object} view with the list of the articles
   */
  module.exports.getArticles = function (req, res) {
    Article.find({}, {title: 1, slug: 1, created: 1})
      .sort({created:-1})
      .execFind(function (err, articles) {
        res.render('blog/admin/articles', {
          title: 'Administración de artículos',
          section:'blog',
          articles: articles
        });
    });
  };
  
  /**
   * Retrieve a form to create a new article
   * 
   * @param  {Object} req : request
   * @param  {Object} res : response
   * @return {Object} view of article's form 
   */
  module.exports.getNewArticle = function (req, res) {
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
  module.exports.newArticle = function (req, res) {
    Article.find({username: req.body.slug}, {slug: 1}, function (err, articles) {
      if (err || articles.length > 0) {
        next(new Error('The article already exists'));
      } else {
        /* TODO */
        var article = new Article();
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
  
  /**
   * Retrieve the article by title
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   * @return {Object}   view of the article
   */
  module.exports.getArticle = function (req, res, next) {
    Article.find({slug: req.params.slug}, function (err, articles) {
      if (err) {
        next();
      } else {
        res.render('blog/admin/article', {
          title: 'Edición de artículo',
          section:'blog',
          article: articles[0]
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
  module.exports.updateArticle = function (req, res, next) {
    Article.find({slug: req.params.slug}, function (err, articles) {
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
  
};

