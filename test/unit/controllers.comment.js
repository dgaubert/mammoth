'use strict';

var sinon = require('sinon'),
    Article = require('../../lib/models/article'),
    Captcha = require('../../lib/models/captcha'),
    ArticleService = require('../../lib/services/article')(Article),
    CaptchaService = require('../../lib/services/captcha')(Captcha),
    CommentController = require('../../lib/controllers/comment'),
    ArticleFake = require('../fixtures/article'),
    CaptchaFake = require('../fixtures/captcha'),
    support = require('../fixtures/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/comment', function () {

  req.params.slug = '/blog/admin/comment/slug';
  req.params.commentId = 'commentId';

  describe('.list(req, res, next)', function () {

    it('Comments should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          commentController = new CommentController(ArticleServiceStub);

      commentController.list(req, res, next);

      ArticleServiceStub.findBySlug.called.should.equal(true);

    }));

    it('Comments views should be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          commentController = new CommentController(ArticleServiceStub);

      this.spy(res, 'render');

      commentController.list(req, res, next);

      ArticleService.findBySlug.callArgWith(1, null, new ArticleFake());

      res.render.calledWith('blog/admin/comments').should.equal(true);

    }));

  });

  describe('.remove(req, res, next)', function () {

    it('Comment should be found', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          commentController = new CommentController(ArticleServiceStub);

      commentController.remove(req, res, next);

      ArticleService.findBySlug.called.should.equal(true);

    }));

    it('Comment should be deleted', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          commentController = new CommentController(ArticleServiceStub);

      this.spy(res, 'redirect');

      commentController.remove(req, res, next);

      ArticleService.findBySlug.callArgWith(1, null, new ArticleFake());

      res.redirect.called.should.equal(true);

    }));

  });

 describe('.create(req, res, next)', function () {

    req.body.comment = 'comment';
    req.body.name = 'Daniel G. Aubert';
    req.body.mail = 'danielgarciaaubert@gmail.com';

    req.body.captcha = 1;
    req.body.captchaName = '1.png';

    it('Comment should be created', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          captchaServiceStub = this.stub(CaptchaService),
          commentController = new CommentController(articleServiceStub, captchaServiceStub);

      this.spy(res, 'send');

      commentController.create(req, res, next);

      captchaServiceStub.findByValue.callArgWith(1, null, [new CaptchaFake()]);
      articleServiceStub.findBySlug.callArgWith(1, null, new ArticleFake());

      res.send.calledWith(200).should.equal(true);

    }));

    it('Comment should not be created', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          captchaServiceStub = this.stub(CaptchaService),
          commentController = new CommentController(articleServiceStub, captchaServiceStub);

      this.spy(res, 'send');

      commentController.create(req, res, next);

      captchaServiceStub.findByValue.callArgWith(1, null, [new CaptchaFake()]);
      articleServiceStub.findBySlug.callArgWith(1, new Error());

      res.send.calledWith(500).should.equal(true);

    }));

  });

});
