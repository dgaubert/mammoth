var sinon = require('sinon'),
    Article = require('../lib/models/article'),
    ArticleService = require('../lib/services/article')(Article),
    RssController = require('../lib/controllers/rss'),
    ArticleFake = require('./support/article'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;
    
describe('controllers/rss', function () {

  describe('.list(req, res, next)', function () {

    it('Article should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          rss = new RssController(ArticleServiceStub);
          
      rss.list(req, res, next);

      ArticleService.findPublished.called.should.be.true;

    }));
    
    it('Response should be sended', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          rss = new RssController(ArticleServiceStub);

      this.spy(res, 'set');
      this.spy(res, 'send');

      rss.list(req, res, next);

      ArticleServiceStub.findPublished.callArgWith(0, null, [new ArticleFake()]);

      res.set.calledWith('Content-Type', 'application/rss+xml').should.be.true;
      res.send.called.should.be.true;

    }));

    it('Response should not be sended', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          rss = new RssController(ArticleServiceStub);

      next = this.spy(next);

      rss.list(req, res, next);

      ArticleServiceStub.findPublished.callArgWith(0, new Error(), null);

      next.called.should.be.true;

    }));

  });

});
