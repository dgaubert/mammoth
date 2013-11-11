var support = require('./support'),
    sinon = require('sinon'),
    Rss = require('../lib/routes/rss')
    Model = support.Model,
    req = support.req,
    res = support.res,
    next = support.next;
    
describe('routes/rss', function () {

  // Set model
  Model.setModel(support.article);

  describe('.getFeed(req, res, next)', function () {

    it('Article should be gotten', sinon.test(function () {

      var rss = new Rss(Model.ok());

      this.spy(Model, 'find');
      this.spy(Model, 'exec');

      rss.getFeed(req, res, next);

      Model.find.called.should.be.true;
      Model.exec.called.should.be.true;

    }));
    
    it('Response should be sended', sinon.test(function () {

      var rss = new Rss(Model.ok());
      
      this.spy(res, 'set');
      this.spy(res, 'send');

      rss.getFeed(req, res, next);

      res.set.calledWith('Content-Type', 'application/rss+xml').should.be.true;
      res.send.called.should.be.true;

    }));

    it('Response should not be sended', sinon.test(function () {

      var rss = new Rss(Model.ko());
      
      next = this.spy(next);

      rss.getFeed(req, res, next);

      next.called.should.be.true;

    }));

  });

});
