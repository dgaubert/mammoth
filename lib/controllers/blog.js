'use strict';

var di = require('di');
var BlogService = require('../services/blog');
var Paginator = require('../utils/paginator');
var parser = require('../utils/mdparser');

function BlogController(blogService) {
  this.service = blogService;
}

BlogController.prototype = {

  list: function (req, res, next) {
    var page = parseInt(req.query.page, 10) || 0;
    var category = req.params.category;
    var tag = req.params.tag ? [req.params.tag] : null;

    this.service.list(page, category, tag)
      .then(function (blog) {
        res.render('blog/blog', {
          title: 'Blog - Daniel García Aubert',
          section:'blog',
          articles: parser(blog.articles),
          pagination: new Paginator(page, blog.count)
        });
      })
      .fail(function (err) {
        next(err);
      });
  },

  retrieve: function (req, res, next) {
    var slug = req.params.slug;

    this.service.retrieve(slug)
      .then(function (blog) {
        res.render('blog/article', {
          title: blog.article.title + ' - Blog - Daniel García Aubert',
          section:'blog',
          article: parser(blog.article),
          categories: blog.categories[0],
          tags: blog.tags[0],
          lasts: blog.lasts,
          captcha: blog.captcha,
          similars: blog.similars
        });
      })
      .fail(function (err) {
        next(err);
      });

  }
};

di.annotate(BlogController, new di.Inject(BlogService));

module.exports = BlogController;
