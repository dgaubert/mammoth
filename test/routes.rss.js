var express = require('express'),
    rss = require('../lib/routes/rss'),
    Article = require('../models/article'),
    sinon = require('sinon');
    
describe('routes/rss', function () {
  var articleStub,
      appMock;
  
  describe('.createFeed(articles)', function () {
  
    before(function () {
      articleStub = sinon.stub(Article.prototype.base.Model, 'find', function () {
        var article = {},
            i;
        for (i = 0; i < 5; i++) {
          article.title = 'Title ' + i;
          article.slug = '/slug/' + i;
          article.abstract = 'Abstract ' + i;
          article.date = new Date();
          
          articles.push(article);
        }
        return articles;
      });
      
      app = sinon.stub(
      
    });
  
    it('Feed should be created', function () {
      
    });
  });

});
