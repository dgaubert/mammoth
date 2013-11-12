var sinon = require('sinon'),
    Article = require('./support/article'),
    Rss = require('../lib/routes/rss'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;
    
describe('routes/rss', function () {

  describe('.getFeed(req, res, next)', function () {

    it('Article should be gotten', sinon.test(function () {

      var rss = new Rss(Article.ok());

      this.spy(Article, 'find');
      this.spy(Article, 'exec');

      rss.getFeed(req, res, next);

      Article.find.called.should.be.true;
      Article.exec.called.should.be.true;

    }));
    
    it('Response should be sended', sinon.test(function () {

      var rss = new Rss(Article.ok());
      
      this.spy(res, 'set');
      this.spy(res, 'send');

      rss.getFeed(req, res, next);

      res.set.calledWith('Content-Type', 'application/rss+xml').should.be.true;
      res.send.called.should.be.true;

    }));

    it('Response should not be sended', sinon.test(function () {

      var rss = new Rss(Article.ko());
      
      next = this.spy(next);

      rss.getFeed(req, res, next);

      next.called.should.be.true;

    }));

  });

});
