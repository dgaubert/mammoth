/* jslint node:true */
/* global describe: true, it:true, beforeEach: true*/
'use strict';
var sinon = require('sinon'),
    Article = require('../../lib/models/article'),
    Picture = require('../../lib/models/picture'),
    ArticleService = require('../../lib/services/article')(Article),
    PictureService = require('../../lib/services/picture')(Picture),
    ArticleController = require('../../lib/controllers/article'),
    ArticleFake = require('../fixtures/article'),
    PictureFake = require('../fixtures/picture'),
    support = require('../fixtures/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/article', function () {

  // fake request body form
  req.body.title = 'test';
  req.body.author = 'test';
  req.body.slug = 'test';
  req.body.category = 'test';
  req.body.abstract = 'test';
  req.body.content = 'test';
  req.body.tags = 'test,test';

  describe('.list(req, res, next)', function () {

    it('Articles should be gotten', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          pictureServiceStub = this.stub(PictureService),
          articleController  = new ArticleController(articleServiceStub, pictureServiceStub);

      articleController.list(req, res, next);

      articleServiceStub.find.called.should.equal(true);

    }));

    it('Response should be rendered', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          pictureServiceStub = this.stub(PictureService),
          articleController = new ArticleController(articleServiceStub, pictureServiceStub);

      this.spy(res, 'render');

      articleController.list(req, res, next);

      articleServiceStub.find.callArgWith(0, null, [new ArticleFake()]);

      res.render.calledWith('blog/admin/articles').should.equal(true);

    }));

    it('Response should not be rendered', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          pictureServiceStub = this.stub(PictureService),
          articleController = new ArticleController(articleServiceStub, pictureServiceStub);

      next = this.spy(next);

      articleController.list(req, res, next);

      articleServiceStub.find.callArgWith(0, new Error(), null);

      next.called.should.equal(true);

    }));


  });

  describe('.getNewArticle(req, res)', function () {

    it('View should be rendered', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          pictureServiceStub = this.stub(PictureService),
          articleController = new ArticleController(articleServiceStub, pictureServiceStub);

      this.spy(res, 'render');

      articleController.show(req, res);

      res.render.calledWith('blog/admin/article').should.equal(true);

    }));

  });

  describe('.create(req, res)', function () {

    it('Article should be gotten', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          pictureServiceStub = this.stub(PictureService),
          articleController = new ArticleController(articleServiceStub, pictureServiceStub);

      articleController.create(req, res, next);

      articleServiceStub.findBySlug.called.should.equal(true);

    }));

    it('Exists the article to save', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          pictureServiceStub = this.stub(PictureService),
          articleController = new ArticleController(articleServiceStub, pictureServiceStub);

      next = this.spy(next);

      articleController.create(req, res, next);

      articleServiceStub.findBySlug.callArgWith(1, null, new ArticleFake());

      next.called.should.equal(true);

    }));

  });

  describe('.getArticle(req, res, next)', function () {

    it('Article should be gotten', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          pictureServiceStub = this.stub(PictureService),
          articleController = new ArticleController(articleServiceStub, pictureServiceStub);

      articleController.retrieve(req, res, next);

      articleServiceStub.findBySlug.called.should.equal(true);
      pictureServiceStub.findByArticle.called.should.equal(true);

    }));

    it('Response should be rendered', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          pictureServiceStub = this.stub(PictureService),
          articleController = new ArticleController(articleServiceStub, pictureServiceStub);

      this.spy(res, 'render');

      articleController.retrieve(req, res, next);

      articleServiceStub.findBySlug.callArgWith(1, null, new ArticleFake());
      pictureServiceStub.findByArticle.callArgWith(1, null, [new PictureFake()]);

      res.render.calledWith('blog/admin/article').should.equal(true);

    }));

    it('Response should not be rendered', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          pictureServiceStub = this.stub(PictureService),
          articleController = new ArticleController(articleServiceStub, pictureServiceStub);

      next = this.spy(next);

      articleController.retrieve(req, res, next);

      articleServiceStub.findBySlug.callArgWith(1, new Error(), null);
      pictureServiceStub.findByArticle.callArgWith(1, null, [new PictureFake()]);

      next.called.should.equal(true);

    }));

  });

  describe('.updateArticle(req, res, next)', function () {

    it('Article should be gotten', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          pictureServiceStub = this.stub(PictureService),
          articleController = new ArticleController(articleServiceStub, pictureServiceStub);

      articleController.update(req, res, next);

      articleServiceStub.findBySlug.called.should.equal(true);

    }));

    it('Article updated, should be redirected', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
        pictureServiceStub = this.stub(PictureService),
        articleController = new ArticleController(articleServiceStub, pictureServiceStub);

      this.spy(res, 'redirect');

      articleController.update(req, res, next);

      articleServiceStub.findBySlug.callArgWith(1, null, new ArticleFake());

      res.redirect.called.should.equal(true);

    }));

    it('Article not updated', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
        pictureServiceStub = this.stub(PictureService),
        articleController = new ArticleController(articleServiceStub, pictureServiceStub);

      next = this.spy(next);

      articleController.update(req, res, next);

      articleServiceStub.findBySlug.callArgWith(1, new Error(), null);

      next.called.should.equal(true);

    }));

  });

});
