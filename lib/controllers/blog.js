'use strict';

var di = require('di');
var BlogService = require('../services/blog');
var Paginator = require('../utils/paginator');
var parser = require('../utils/mdparser');

var BlogController = function BlogController(blogService) {
  this.blogService = blogService;
};

BlogController.prototype = {

  // public

  'list': function list(req, res, next) {
    var page = parseInt(req.params.page, 10) || 0;
    var category = req.params.category;
    var tag = req.params.tag ? [req.params.tag] : null;

    this.blogService.list(page, category, tag, function listBlogDone(err, blog) {
      if (err) {
        return next(err);
      }
      if (!blog.articles.length) {
        return next();
      }

      res.render('blog/blog', {
        title: 'Blog - Daniel García Aubert',
        section:'blog',
        articles: parser(blog.articles),
        pagination: new Paginator(page, blog.count)
      });

    });
  },

  'retrieve': function retrieve(req, res, next) {
    var slug = req.params.slug;

    this.blogService.retrieve(slug, function retrieveArticleDone(err, blog) {
      if (err) {
        return next(err);
      }
      if (!blog) {
        return next();
      }

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
    });
  }
};

di.annotate(BlogController, new di.Inject(BlogService));

module.exports = BlogController;
