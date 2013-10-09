var support = require('./support'),
    sinon = require('sinon'),
    Blog = require('../lib/routes/blog');

describe('routes/login', function () {
  var SummaryModel = support.SummaryModel,
      ArticleModel = support.ArticleModel,
      blog = new Blog(ArticleModel, SummaryModel),
      req = support.req,
      res = support.res,
      next = support.next;

  describe('.getSummary', function () {

    it('Render de blog view', function () {
      req.params.page = 0,
      req.params.category = 'category',
      req.params.tag = ['tag'],
      res.render = sinon.spy();

      blog.getSummary(req, res, next);

      res.render.calledWith('blog/blog').should.be.true;
    });

  });

  describe('.getArticle', function () {

    it('Render de article view', function () {
      req.params.slug = '/blog/slug',
      res.render = sinon.spy();

      blog.getArticle(req, res, next);

      res.render.calledWith('blog/article').should.be.true;
    });

  });  

});