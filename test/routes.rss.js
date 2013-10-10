var support = require('./support'),
    sinon = require('sinon'),
    Rss = require('../lib/routes/rss');
    
describe('routes/rss', function () {
  var ArticleModel = support.ArticleModel,
      rss = new Rss(ArticleModel),
      ArticleModelKO = support.ArticleModelKO,
      rssKO = new Rss(ArticleModelKO);
      req = support.req,
      res = support.res,
      next = support.next;

  describe('.getFeed(req, res, next)', function () {

    it('ArticleModels should be gotten', function () {
      var ArticleModelMock = sinon.mock(ArticleModel);
      ArticleModelMock.expects('findAll').once();

      rss.getFeed(req, res, next);

      ArticleModelMock.verify();
    });
    
    it('Response should be sended', function () {
      res.set = sinon.spy();
      res.send = sinon.spy();

      rss.getFeed(req, res, next);

      res.set.calledWith('Content-Type', 'application/rss+xml').should.be.true;
      res.send.called.should.be.true;
      res.set.reset();
      res.send.reset();
    });

    it('Response should not be sended', function () {
      next = sinon.spy();

      rssKO.getFeed(req, res, next);

      next.called.should.be.true;
      next.reset();
    });

  });

});
