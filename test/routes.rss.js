var rss = require('../lib/routes/rss'),
    should = require('should');
    
describe('routes/rss', function () {
  var articles = [];
  
  describe('.createFeed(articles)', function () {
  
    before(function () {
      var article = {},
          i = 0;

      for (i = 0; i < 5; i++) {
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

});
