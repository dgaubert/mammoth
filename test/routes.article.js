var support = require('./support'),
    sinon = require('sinon'),
    Article = require('../lib/routes/article');

describe('routes/article', function () {
  var ArticleModel = support.ArticleModel,
      ArticleModelKO = support.ArticleModelKO,
      ArticleModelEmpty = support.ArticleModelEmpty,
      article = new Article(ArticleModel),
      articleKO = new Article(ArticleModelKO),
      articleEmpty = new Article(ArticleModelEmpty),
      req = support.req,
      res = support.res,
      next = support.next;

  describe('.getArticles(req, res, next)', function () {

    it('Articles should be gotten', function () {
      var ArticleModelMock = sinon.mock(ArticleModel);
      ArticleModelMock.expects('findAll').once();

      article.getArticles(req, res, next);

      ArticleModelMock.verify();
    });
    
    it('Response should be rendered', function () {
      res.render = sinon.spy();

      article.getArticles(req, res, next);

      res.render.calledWith('blog/admin/articles').should.be.true;
    });

    it('Response should not be rendered', function () {
      next = sinon.spy();     

      articleKO.getArticles(req, res, next);

      next.called.should.be.true;
    });

  });

  describe('.getNewArticle(req, res)', function () {

    it('View should be rendered', function () {
      res.render = sinon.spy();

      article.getNewArticle(req, res);

      res.render.calledWith('blog/admin/article').should.be.true;
    });

  });

  describe('.newArticle(req, res)', function () {

    it('Article should be gotten', function () {
      var ArticleModelMock = sinon.mock(ArticleModel);
      ArticleModelMock.expects('findAll').once();

      article.newArticle(req, res, next);

      ArticleModelMock.verify();
    });

    it('Exists the article to save', function () {
      var nextSpy = sinon.spy();

      article.newArticle(req, res, nextSpy);

      nextSpy.called.should.be.true;
    });

  });

  describe('.getArticle(req, res, next)', function () {

    it('Article should be gotten', function () {
      var ArticleModelMock = sinon.mock(ArticleModel);
      ArticleModelMock.expects('findAll').once();

      article.getArticle(req, res, next);

      ArticleModelMock.verify();
    });
    
    it('Response should be rendered', function () {
      res.render = sinon.spy();

      article.getArticle(req, res, next);

      res.render.calledWith('blog/admin/article').should.be.true;
    });

    it('Response should not be rendered', function () {
      var nextSpy = sinon.spy();

      articleKO.getArticle(req, res, nextSpy);

      nextSpy.called.should.be.true;
    });

  }); 

  describe('.updateArticle(req, res, next)', function () {

    it('Article should be gotten', function () {
      var ArticleModelMock = sinon.mock(ArticleModel);
      ArticleModelMock.expects('findAll').once();

      article.updateArticle(req, res, next);

      ArticleModelMock.verify();
    });

  });

});
