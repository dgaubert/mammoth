var sinon = require('sinon');
    
describe('routes/rss', function () {

  var rss = require('../lib/routes/rss');

  describe('.getFeed(req, res, next)', function () {
    
    it('Response sended', function () {
      
      var ArticleMock = {
            findAll: function(sort, cb) {
              var article = {},
                  articles = [];
              for (var i = 0; i < 5; i++) {
                article.title = 'Title ' + i;
                article.slug = '/slug/' + i;
                article.abstract = 'Abstract ' + i;
                article.created = new Date();
                
                articles.push(article);
              }

              cb(null, articles);
            }
          },
          req = {},
          res = {
            set: function (prop, val) {}, 
            send: function (view) {}
          },
          next = function () {};

      rss.init(ArticleMock);
      rss.getFeed(req, res, next);

    });


  // describe.skip('.createFeed(articles)', function () {

  //   var articles = [];

  //   before(function () {
  //     var article = {};

  //     for (var i = 0; i < 5; i++) {
  //       article.title = 'Title ' + i;
  //       article.slug = '/slug/' + i;
  //       article.abstract = 'Abstract ' + i;
  //       article.date = new Date();
        
  //       articles.push(article);
  //     }


  //   });

  //   it('Feed should be created', function () {
  //     rss.init()
  //     var feed = rss.createFeed(articles);
      
  //     feed.should.be.an.instanceof(Object);
  //     feed.items.should.be.an.instanceof(Array);
  //     feed.items.should.have.length(5);
  //   });

  // });
  

  });

});
