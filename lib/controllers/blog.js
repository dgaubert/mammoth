'use strict';

var di = require('di');
var _ = require('lodash');
var base = require('./base');
var BlogService = require('../services/blog');
var Paginator = require('../utils/paginator');
var parser = require('../utils/mdparser');

function BlogController(blogService) {
  this.service = blogService;
  this.path = '/blog/';
  this.propertyAsParamId = 'slug';
  this.template = 'blog/article';
  this.templateList = 'blog/blog';
  this.defaultTemplateContext = {
    title: 'Blog - Daniel García Aubert',
    section: 'blog',
    entity: undefined,
    entities: undefined
  };
}

BlogController.prototype = _.create(base, {

  constructor: BlogController,

  list: function (req, res, next) {
    var _this = this;
    var page = parseInt(req.query.page, 10) || 0;
    var category = req.params.category;
    var tag = req.params.tag ? [req.params.tag] : null;

    return this.service.list(page, category, tag)
      .then(function (blog) {
        _this.renderTemplateList(res, {
          articles: parser(blog.articles),
          pagination: new Paginator(page, blog.count)
        });
      })
      .fail(function (err) {
        next(err);
      });
  },

  retrieve: function (req, res, next) {
    var _this = this;
    var slug = req.params.slug;

    this.service.retrieve(slug)
      .then(function (blog) {
        _this.renderTemplate(res, {
          title: blog.article.title + ' - ' + _this.defaultTemplateContext.title,
          article: parser(blog.article),
          categories: blog.categories,
          tags: blog.tags,
          lasts: blog.lasts,
          captcha: blog.captcha,
          similars: blog.similars
        });
      })
      .fail(function (err) {
        next(err);
      });
  }
});

di.annotate(BlogController, new di.Inject(BlogService));

module.exports = BlogController;
