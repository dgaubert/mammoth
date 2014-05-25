/* jslint node:true */
/* global describe: true, it:true*/
'use strict';

var sinon = require('sinon'),
    Article = require('../../lib/models/article'),
    ArticleService = require('../../lib/services/article')(Article),
    RssController = require('../../lib/controllers/rss'),
    ArticleFake = require('../fixtures/article'),
    support = require('../fixtures/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/rss', function () {

  describe('.list(req, res, next)', function () {

    it('Article should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          rssController = RssController(ArticleServiceStub);

      rssController.list(req, res, next);

      ArticleServiceStub.findPublished.called.should.equal(true);

    }));

    it('Response should be sended', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          rssController = RssController(ArticleServiceStub);

      this.spy(res, 'set');
      this.spy(res, 'send');

      rssController.list(req, res, next);

      ArticleServiceStub.findPublished.callArgWith(0, null, [new ArticleFake()]);

      res.set.calledWith('Content-Type', 'application/rss+xml').should.equal(true);
      res.send.called.should.equal(true);

    }));

    it('Response should not be sended', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          rssController = RssController(ArticleServiceStub);

      next = this.spy(next);

      rssController.list(req, res, next);

      ArticleServiceStub.findPublished.callArgWith(0, new Error(), null);

      next.called.should.equal(true);

    }));

  });

});
