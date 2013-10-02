var rss = require('../lib/routes/rss'),
    sinon = require('sinon');
    
describe('routes/rss', function () {

  describe('.createFeed(articles)', function () {
    var articles = [];

    before(function () {
      var article = {};

      for (var i = 0; i < 5; i++) {
        article.title = 'Title ' + i;
        article.slug = '/slug/' + i;
        article.abstract = 'Abstract ' + i;
        article.date = new Date();
        
        articles.push(article);
      }

    });

    it('Feed should be created', function () {

      var feed = rss.createFeed(articles);
      
      feed.should.be.an.instanceof(Object);
      feed.items.should.be.an.instanceof(Array);
      feed.items.should.have.length(5);
    });

  });
  
  describe('.getFeed(req, res, next)', function () {
    
    it('Response sended', function () {
      
      var Article = require('../lib/models/article'),
          ArticleStub = sinon.stub(Article.prototype.base.Model, 'exec', function (cb) {
            cb(null, [{}]);
          }),
          req = {},
          res = sinon.stub({set: function (a, b) {}, send: function (v) {}}),
          next = sinon.spy();

      rss.init(ArticleStub);
      rss.getFeed(req, res, next);

      next.called.should.be.false;
    });

  });

});
