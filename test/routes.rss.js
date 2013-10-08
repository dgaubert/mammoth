var sinon = require('sinon'),
    Rss = require('../lib/routes/rss');
    
describe('routes/rss', function () {

  var req = {},
      res = {
        set: function () {},
        send: function () {}
      },
      next = function () {};

  describe('.getFeed(req, res, next)', function () {

    var Article = {
          findAll: function(filter, fields, sort, callback) {
            callback(null, [{
              title: 'Title',
              slug: '/slug',
              abstract: 'Abstract',
              created: new Date()
            }]);
          }
        },
        rss = new Rss(Article);

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

    it('Response should not be sended', function () {
      var nextSpy = sinon.spy();
      Article = {
        findAll: function(filter, fields, sort, callback) {
          callback('error', null);
        }
      };
      rss = new Rss(Article);

      rss.getFeed(req, res, nextSpy);

      nextSpy.called.should.be.true;
    });

  });

});
