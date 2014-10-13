'use strict';

var sinon = require('sinon');

describe('controllers/article', function () {

  var ArticleController = require('../../../lib/controllers/article');
  var articleController;
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
      tags: 'irrelevantTag1,irrelevantTag2'
    },
    params: {
      slug: 'irrelevantSlug'
    }
  };
  var next = function () {};

  var ArticleService = function () {};
  ArticleService.prototype.list = function () {};
  ArticleService.prototype.create = function () {};
  ArticleService.prototype.retrieve = function () {};
  ArticleService.prototype.update = function () {};

  var sandbox;
  var articleServiceStub;
  var article = req.body;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    res.render = sandbox.spy(res, 'render');
    res.redirect = sandbox.spy(res, 'redirect');
    next = sandbox.spy(next);

    articleServiceStub = sandbox.stub(new ArticleService()),
    articleController  = new ArticleController(articleServiceStub);
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('.create(req, res)', function () {

    it('should delegate to the service the article\'s creation', function () {
      articleServiceStub.create.callsArgWith(1, null, article);

      articleController.create(req, res, next);

      articleServiceStub.create.called.should.be.true;
    });

    it('should redirect to the article created', function () {
      articleServiceStub.create.callsArgWith(1, null, article);

      articleController.create(req, res, next);

      res.redirect.calledWith('/blog/admin/articles/' + article.slug).should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      articleServiceStub.create.callsArgWith(1, err, null);

      articleController.create(req, res, next);

      next.called.should.equal(true);
    });

  });

  describe('.list(req, res, next)', function () {

    it('should use the "list" method of article service', function () {
      articleServiceStub.list.callsArgWith(0, null, [article]);

      articleController.list(req, res, next);

      articleServiceStub.list.called.should.be.true;
    });

    it('should render "blog/admin/articles" view', function () {
      articleServiceStub.list.callsArgWith(0, null, [article]);

      articleController.list(req, res, next);

      res.render.calledWith('blog/admin/articles').should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      articleServiceStub.list.callsArgWith(0, err, null);

      articleController.list(req, res, next);

      next.calledWith(err).should.be.true;
    });

  });

  describe('.show(req, res)', function () {

    it('should render "blog/admin/article" view', function () {
      articleController.show(req, res);

      res.render.calledWith('blog/admin/article').should.equal(true);
    });

  });


  describe('.retrieve(req, res, next)', function () {

    it('should use the "retrieve" method of article service', function () {
      articleServiceStub.retrieve.callsArgWith(1, null, article);

      articleController.retrieve(req, res, next);

      articleServiceStub.retrieve.called.should.be.true;
    });

    it('should render "blog/admin/article" article view', function () {
      articleServiceStub.retrieve.callsArgWith(1, null, article);

      articleController.retrieve(req, res, next);

      res.render.calledWith('blog/admin/article').should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      articleServiceStub.retrieve.callsArgWith(1, err, null);

      articleController.retrieve(req, res, next);

      next.calledWith(err).should.be.true;
    });

  });

  describe('.update(req, res, next)', function () {

    it('should delegate to article\'s service', function () {
      articleServiceStub.update.callsArgWith(1, null, article);

      articleController.update(req, res, next);

      articleServiceStub.update.called.should.be.true;
    });

    it('should redirect to updated article', function () {
      articleServiceStub.update.callsArgWith(1, null, article);

      articleController.update(req, res, next);

      res.redirect.calledWith('/blog/admin/articles/' + article.slug).should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      articleServiceStub.update.callsArgWith(1, err, null);

      articleController.update(req, res, next);

      next.called.should.equal(true);
    });

  });

});
