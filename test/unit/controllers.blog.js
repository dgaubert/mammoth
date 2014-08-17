/* jslint node:true */
/* global describe: true, it:true*/
'use strict';
var sinon = require('sinon'),
    Article = require('../../lib/models/article'),
    Captcha = require('../../lib/models/captcha'),
    ArticleService = require('../../lib/services/article')(Article),
    CaptchaService = require('../../lib/services/captcha')(Captcha),
    BlogController = require('../../lib/controllers/blog'),
    ArticleFake = require('../fixtures/article'),
    support = require('../fixtures/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/blog', function () {

  describe('.list', function () {

    req.params.page = 0;
    req.params.category = 'category';
    req.params.tag = ['tag'];

    it('Summary should be gotten', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          captchaServiceStub = this.stub(CaptchaService),
          blogController = new BlogController(articleServiceStub, captchaServiceStub);

      blogController.list(req, res, next);

      articleServiceStub.findPublishedByCategoryOrTag.called.should.equal(true);
      articleServiceStub.countPublishedByCategoryOrTag.called.should.equal(true);

    }));


    it('Blog view should be rendered', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          captchaServiceStub = this.stub(CaptchaService),
          blogController = new BlogController(articleServiceStub, captchaServiceStub);

      this.spy(res, 'render');

      blogController.list(req, res, next);

      articleServiceStub.findPublishedByCategoryOrTag.callArgWith(3, null, [new ArticleFake()]);
      articleServiceStub.countPublishedByCategoryOrTag.callArgWith(2, null, 1);

      res.render.calledWith('blog/blog').should.equal(true);

    }));

    it('Error to find articles publised', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          captchaServiceStub = this.stub(CaptchaService),
          blogController = new BlogController(articleServiceStub, captchaServiceStub);

      next = this.spy(next);

      blogController.list(req, res, next);

      articleServiceStub.findPublishedByCategoryOrTag.callArgWith(3, new Error(), null);

      next.called.should.equal(true);

    }));

  });

  describe('.retrieve', function () {

    it('Article should be gotten', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          captchaServiceStub = this.stub(CaptchaService),
          blogController = new BlogController(articleServiceStub, captchaServiceStub);

      blogController.retrieve(req, res, next);

      articleServiceStub.findBySlug.called.should.equal(true);
      articleServiceStub.countCategories.called.should.equal(true);
      articleServiceStub.countTags.called.should.equal(true);
      articleServiceStub.findLastThree.called.should.equal(true);

    }));

    it('Render de article view', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          captchaServiceStub = this.stub(CaptchaService),
          blogController = new BlogController(articleServiceStub, captchaServiceStub);

      req.params.slug = '/blog/slug';

      this.spy(res, 'render');

      blogController.retrieve(req, res, next);

      // articleServiceStub.findBySlug.callArgWith(1, null, new ArticleFake());
      articleServiceStub.countCategories.callArgWith(0, null, 1);
      articleServiceStub.countTags.callArgWith(0, null, 1);
      articleServiceStub.findLastThree.callArgWith(0, null, [new ArticleFake()]);
      // articleServiceStub.findByCategory.callArgWith(1, null, [new ArticleFake()]);

      res.render.calledWith('blog/article').should.equal(true);

    }));

    it('Error in Article', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          captchaServiceStub = this.stub(CaptchaService),
          blogController = new BlogController(articleServiceStub, captchaServiceStub);

      next = this.spy(next);

      blogController.retrieve(req, res, next);

      articleServiceStub.findBySlug.callArgWith(1, new Error(), null);

      next.called.should.equal(true);

    }));

  });

});
