/* jslint node:true */
/* global describe: true, it:true*/
'use strict';

var sinon = require('sinon'),
    Article = require('../lib/models/article'),
    articleService = require('../lib/services/article')(Article),
    rssController = require('../lib/controllers/rss'),
    ArticleFake = require('./support/article'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;
    
describe('controllers/rss', function () {

  describe('.list(req, res, next)', function () {

    it('Article should be gotten', sinon.test(function () {
      var articleServiceStub = this.stub(articleService),
          rssCntlr = new rssController(articleServiceStub);
          
      rssCntlr.list(req, res, next);

      articleService.findPublished.called.should.equal(true);

    }));
    
    it('Response should be sended', sinon.test(function () {
      var articleServiceStub = this.stub(articleService),
          rssCntlr = new rssController(articleServiceStub);

      this.spy(res, 'set');
      this.spy(res, 'send');

      rssCntlr.list(req, res, next);

      articleServiceStub.findPublished.callArgWith(0, null, [new ArticleFake()]);

      res.set.calledWith('Content-Type', 'application/rss+xml').should.equal(true);
      res.send.called.should.equal(true);

    }));

    it('Response should not be sended', sinon.test(function () {
      var articleServiceStub = this.stub(articleService),
          rssCntlr = new rssController(articleServiceStub);

      next = this.spy(next);

      rssCntlr.list(req, res, next);

      articleServiceStub.findPublished.callArgWith(0, new Error(), null);

      next.called.should.equal(true);

    }));

  });

});
