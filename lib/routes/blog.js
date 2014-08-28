/* jslint node: true */
'use strict';

var Paginator = require('../utils/paginator');
var parser = require('../utils/mdparser');

function BlogRoute(BlogController) {

  // public

  function list(req, res, next) {
    var page = parseInt(req.params.page, 10) || 0;
    var category = req.params.category ? req.params.category[0] : null;
    var tag = req.params.tag ? [req.params.tag[0]] : null;

    BlogController.list(page, category, tag, function listBlogDone(err, blog) {
      if (err) {
        return next(err);
      }

      if (!blog.articles.length) {
        return next(new Error ('No articles found'));
      }

      res.render('blog/blog', {
        title: 'Blog - Daniel García Aubert',
        section:'blog',
        articles: parser(blog.articles),
        pagination: new Paginator(page, blog.count)
      });

    });
  }

  function retrieve(req, res, next) {
    var slug = req.params.slug ? req.params.slug[0] : null;

    BlogController.retrieve(slug, function retrieveArticleDone(err, blog) {
      if (err) {
        return next(err);
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

  // expose

  return {
    'list': list,
    'retrieve': retrieve
  };
}

module.exports = BlogRoute;
