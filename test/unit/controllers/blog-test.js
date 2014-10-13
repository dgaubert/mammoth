'use strict';
var sinon = require('sinon');

describe('controllers/blog', function () {

  var BlogController = require('../../../lib/controllers/blog');
  var blogController;
  var res = {
    render: function () {},
    redirect: function () {}
  };
  var req = {
    body: {
      title: 'irrelevantTitle',
      author: 'irrelevantAuthor',
      slug: 'irrelevantSlug',
      category: 'irrelevantCategory',
      abstract: 'irrelevantAbstract',
      content: 'irrelevantContent',
      tags: 'irrelevantTag1,irrelevantTag2',
      categories: ['irrelevantCategory']
    },
    params: {
      page: 'irrelevantPage',
      category: 'irrelevantCategory',
      tag: 'irrelevantTag',
      slug: 'irrelevantSlug'
    }
  };
  var next = function () {};

  var BlogService = function () {};
  BlogService.prototype.list = function () {};
  BlogService.prototype.retrieve = function () {};

  var sandbox;
  var blogServiceStub;
  var article = req.body;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    res.render = sandbox.spy(res, 'render');
    res.redirect = sandbox.spy(res, 'redirect');
    next = sandbox.spy(next);

    blogServiceStub = sandbox.stub(new BlogService()),
    blogController  = new BlogController(blogServiceStub);
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('.list(req, res, next)', function () {

    it('should use the "list" method of article service', function () {
      blogServiceStub.list.callsArgWith(3, null, { articles: [article] });

      blogController.list(req, res, next);

      blogServiceStub.list.called.should.be.true;
    });

    it('should render "blog/blog" view', function () {
      blogServiceStub.list.callsArgWith(3, null,  { articles: [article] });

      blogController.list(req, res, next);

      res.render.calledWith('blog/blog').should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      blogServiceStub.list.callsArgWith(3, err, null);

      blogController.list(req, res, next);

      next.calledWith(err).should.be.true;
    });

  });

  describe('.retrieve(req, res, next)', function () {
    var blog =  {
      article: article,
      categories: ['irrelevantCategory'],
      tags: ['irrelevantTag1'],
      lasts: ['irrelevantTitle'],
      captcha: 'irrelevantCaptcha',
      similars: ['irrelevantSimilars']
    };

    it('should use the "retrieve" method of article service', function () {
      blogServiceStub.retrieve.callsArgWith(1, null,  blog);

      blogController.retrieve(req, res, next);

      blogServiceStub.retrieve.called.should.be.true;
    });

    it('should render "blog/article" article view', function () {
      blogServiceStub.retrieve.callsArgWith(1, null, blog);

      blogController.retrieve(req, res, next);

      res.render.calledWith('blog/article').should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      blogServiceStub.retrieve.callsArgWith(1, err, null);

      blogController.retrieve(req, res, next);

      next.calledWith(err).should.be.true;
    });

  });

});
