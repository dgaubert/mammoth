'use strict';

var di = require('di');
var _ = require('lodash');
var BaseController = require('./base');
var ArticleService = require('../services/article');
var ArticleMapper = require('../mappers/article');

function ArticleController(articleService, articleMapper) {
  this.service = articleService;
  this.mapper = articleMapper;
  this.path = '/blog/admin/articles/';
  this.propertyAsParamId = 'slug';
  this.template = 'blog/admin/article';
  this.templateList = 'blog/admin/articles';
  this.defaultTemplateContext = {
    title: 'Administración de artículos',
    section: 'blog',
    entity: undefined,
    entities: undefined
  };
}

ArticleController.prototype = _.create(BaseController, {
  constructor: ArticleController,
});

di.annotate(ArticleController, new di.Inject(ArticleService, ArticleMapper));

module.exports = ArticleController;
