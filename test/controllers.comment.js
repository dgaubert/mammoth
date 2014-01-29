/* jslint node:true */
/* global describe: true, it:true*/
'use strict';
var sinon = require('sinon'),
    Article = require('../lib/models/article'),
    articleService = require('../lib/services/article')(Article),
    commentController = require('../lib/controllers/comment'),
    ArticleFake = require('./support/article'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/comment', function () {

  req.params.slug = '/blog/admin/comment/slug';
  req.params.commentId = 'commentId';

  describe('.list(req, res, next)', function () {

    it('Comments should be gotten', sinon.test(function () {
      var articleServiceStub = this.stub(articleService),
          commentCntlr = new commentController(articleServiceStub);

      commentCntlr.list(req, res, next);

      articleServiceStub.findBySlug.called.should.equal(true);

    }));

    it('Comments views should be rendered', sinon.test(function () {
      var articleServiceStub = this.stub(articleService),
          commentCntlr = new commentController(articleServiceStub);

      this.spy(res, 'render');

      commentCntlr.list(req, res, next);

      articleService.findBySlug.callArgWith(1, null, new ArticleFake());

      res.render.calledWith('blog/admin/comments').should.equal(true);

    }));

  });

  describe('.remove(req, res, next)', function () {

    it('Comment should be found', sinon.test(function () {
      var articleServiceStub = this.stub(articleService),
          commentCntlr = new commentController(articleServiceStub);

      commentCntlr.remove(req, res, next);

      articleService.findBySlug.called.should.equal(true);

    }));

    it('Comment should be deleted', sinon.test(function () {
      var articleServiceStub = this.stub(articleService),
          commentCntlr = new commentController(articleServiceStub);

      this.spy(res, 'redirect');

      commentCntlr.remove(req, res, next);

      articleService.findBySlug.callArgWith(1, null, new ArticleFake());

      res.redirect.called.should.equal(true);

    }));

  });

 describe('.create(req, res, next)', function () {

    req.body.comment = 'comment';
    req.body.name = 'Daniel G. Aubert';
    req.body.mail = 'danielgarciaaubert@gmail.com';

    req.body.challengeId = 1;
    req.body.challengeValue = 'x';

    it('Comment should be created', sinon.test(function () {
      var articleServiceStub = this.stub(articleService),
          commentCntlr = new commentController(articleServiceStub);

      this.spy(res, 'send');

      commentCntlr.create(req, res, next);

      articleServiceStub.findBySlug.callArgWith(1, null, new ArticleFake());

      res.send.calledWith(200).should.equal(true);
      
    }));

    it('Comment should not be created', sinon.test(function () {
      var articleServiceStub = this.stub(articleService),
          commentCntlr = new commentController(articleServiceStub);
      
      next = this.spy(next);

      commentCntlr.create(req, res, next);

      articleServiceStub.findBySlug.callArgWith(1, new Error(), null);

      next.called.should.equal(true);

    }));

  });


});
