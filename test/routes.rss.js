var sinon = require('sinon');
    
describe('routes/rss', function () {

  var articles = [{
        title: 'Title',
        slug: '/slug',
        abstract: 'Abstract',
        created: new Date()
      }],
      Article = {
        findAll: function(sort, callback) {
          callback(null, articles);
        }
      },
      rss = require('../lib/routes/rss'),
      req = {},
      res = {
        set: function () {},
        send: function () {}
      },
      next = function () {};

  before(function () {
    rss.init(Article);
  });

  describe('.getFeed(req, res, next)', function () {

    it('Articles should be gotten', function () {
      var ArticleMock = sinon.mock(Article);
      ArticleMock.expects('findAll').once();

      rss.getFeed(req, res, next);

      ArticleMock.verify();
    });
    
    it('Response should be sended', function () {
      var resMock = sinon.mock(res);
      resMock.expects('set').once().withArgs('Content-Type', 'application/rss+xml');
      resMock.expects('send').once();

      rss.getFeed(req, res, next);

      resMock.verify();
    });

    describe('.createFeed(articles)', function () {

      it('Feed should be created', function () {
        var feed = rss.createFeed(articles);
       
        feed.should.be.an.instanceof(Object);
        feed.items.should.be.an.instanceof(Array);
        feed.items.should.have.length(1);
      });

    });

  });

});
