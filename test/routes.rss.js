var support = require('./support'),
    sinon = require('sinon'),
    Rss = require('../lib/routes/rss')
    ArticleModel = support.ArticleModel,
    rss = new Rss(ArticleModel),
    ArticleModelKO = support.ArticleModelKO,
    rssKO = new Rss(ArticleModelKO);
    req = support.req,
    res = support.res,
    next = support.next;
    
describe('routes/rss', function () {

  describe('.getFeed(req, res, next)', function () {

    it('ArticleModels should be gotten', sinon.test(function () {

      this.spy(ArticleModel, 'find');
      this.spy(ArticleModel, 'exec');

      rss.getFeed(req, res, next);

      ArticleModel.find.called.should.be.true;
      ArticleModel.exec.called.should.be.true;

    }));
    
    it('Response should be sended', sinon.test(function () {
      
      this.spy(res, 'set');
      this.spy(res, 'send');

      rss.getFeed(req, res, next);

      res.set.calledWith('Content-Type', 'application/rss+xml').should.be.true;
      res.send.called.should.be.true;

    }));

    it('Response should not be sended', sinon.test(function () {
      
      next = this.spy(next);

      rssKO.getFeed(req, res, next);

      next.called.should.be.true;

    }));

  });

});
