var sinon = require('sinon'),
    ArticleService = require('../lib/services/article'),
    Article = require('./support/article'),
    RssController = require('../lib/controllers/rss'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;
    
describe('controllers/rss', function () {

  describe('.getFeed(req, res, next)', function () {

    it('Article should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          rss = new RssController(ArticleServiceStub);
          
      rss.getFeed(req, res, next);

      ArticleService.findAllPublished.called.should.be.true;

    }));
    
    it('Response should be sended', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          rss = new RssController(ArticleServiceStub);

      this.spy(res, 'set');
      this.spy(res, 'send');

      rss.getFeed(req, res, next);

      ArticleServiceStub.findAllPublished.callArgWith(0, null, [new Article()]);

      res.set.calledWith('Content-Type', 'application/rss+xml').should.be.true;
      res.send.called.should.be.true;

    }));

    it('Response should not be sended', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          rss = new RssController(ArticleServiceStub);

      next = this.spy(next);

      rss.getFeed(req, res, next);

      ArticleServiceStub.findAllPublished.callArgWith(0, new Error(), null);

      next.called.should.be.true;

    }));

  });

});
