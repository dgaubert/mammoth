var support = require('./support'),
    sinon = require('sinon'),
    Article = require('../lib/routes/article');

describe('routes/article', function () {
  var ArticleModel = support.ArticleModel,
      req = support.req,
      res = support.res,
      next = support.next;

  describe('.getArticles(req, res, next)', function () {

    it('Articles should be gotten', function () {
      var articleModel = new ArticleModel(1),
          article = new Article(articleModel),
          articleModelMock = sinon.mock(articleModel);

      articleModelMock.expects('exec').once();

      article.getArticles(req, res, next);

      articleModelMock.verify();
      articleModelMock.restore();

    });
    
    it('Response should be rendered', function () {
      var articleModel = new ArticleModel(1),
          article = new Article(articleModel);

      res.render = sinon.spy();

      article.getArticles(req, res, next);

      res.render.calledWith('blog/admin/articles').should.be.true;
      res.render.reset();
    });

    it('Response should not be rendered', function () {
      var articleModel = new ArticleModel(-1),
          article = new Article(articleModel);

      next = sinon.spy();     

      article.getArticles(req, res, next);

      next.called.should.be.true;
      next.reset();
    });

  });

  describe('.getNewArticle(req, res)', function () {

    it('View should be rendered', function () {
      var articleModel = new ArticleModel(1),
          article = new Article(articleModel);

      res.render = sinon.spy();

      article.getNewArticle(req, res);

      res.render.calledWith('blog/admin/article').should.be.true;
      res.render.reset();
    });

  });

  describe('.newArticle(req, res)', function () {

    it('Article should be gotten', function () {
      var articleModel = new ArticleModel(1),
          article = new Article(articleModel),
          articleModelMock = sinon.mock(articleModel);

      articleModelMock.expects('findOne').once();

      article.newArticle(req, res, next);

      articleModelMock.verify();
      articleModelMock.restore();

    });

    it('Exists the article to save', function () {
      var articleModel = new ArticleModel(1),
          article = new Article(articleModel);

      next = sinon.spy();

      article.newArticle(req, res, next);

      next.called.should.be.true;
      next.reset();
    });

  });

  describe('.getArticle(req, res, next)', function () {

    it('Article should be gotten', function () {
      var articleModel = new ArticleModel(1),
          article = new Article(articleModel),
          articleModelMock = sinon.mock(articleModel);

      articleModelMock.expects('findOne').once();

      article.getArticle(req, res, next);

      articleModelMock.verify();
    });
    
    it('Response should be rendered', function () {
       var articleModel = new ArticleModel(1),
          article = new Article(articleModel);

      res.render = sinon.spy();

      article.getArticle(req, res, next);

      res.render.calledWith('blog/admin/article').should.be.true;
      res.render.reset();
    });

    it('Response should not be rendered', function () {
      var articleModel = new ArticleModel(-1),
          article = new Article(articleModel);

      next = sinon.spy();

      article.getArticle(req, res, next);

      next.called.should.be.true;
      next.reset();
    });

  }); 

  describe('.updateArticle(req, res, next)', function () {

    it('Article should be gotten', function () {
      var articleModel = new ArticleModel(-1),
          article = new Article(articleModel),
          articleModelMock = sinon.mock(articleModel);

      articleModelMock.expects('findOne').once();

      article.updateArticle(req, res, next);

      articleModelMock.verify();
    });

  });

});
