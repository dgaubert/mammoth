var sinon = require('sinon'),
    ArticleService = require('../lib/services/article-service'),
    PictureService = require('../lib/services/picture-service'),
    Article = require('./support/article'),
    Picture = require('./support/picture'),
    support = require('./support/support'),
    ArticleRouter = require('../lib/routes/article'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/article', function () {

  // fake request body form
  req.body.title = 'test';
  req.body.author = 'test';
  req.body.slug = 'test';
  req.body.category = 'test';
  req.body.abstract = 'test';
  req.body.content = 'test';
  req.body.tags = 'test,test';

  describe('.getArticles(req, res, next)', function () {

    it('Articles should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        article = new ArticleRouter(ArticleServiceStub, PictureServiceStub);

      article.getArticles(req, res, next);

      ArticleServiceStub.findAll.called.should.be.true;

    }));
    
    
    it('Response should be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        article = new ArticleRouter(ArticleServiceStub, PictureServiceStub);

      this.spy(res, 'render');

      article.getArticles(req, res, next);

      ArticleServiceStub.findAll.callArgWith(0, null, [new Article()]);

      res.render.calledWith('blog/admin/articles').should.be.true;

    }));


    it('Response should not be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        article = new ArticleRouter(ArticleServiceStub, PictureServiceStub);

      next = this.spy(next);

      article.getArticles(req, res, next);

      ArticleServiceStub.findAll.callArgWith(0, new Error(), null);

      next.called.should.be.true;

    }));
    

  });

  describe('.getNewArticle(req, res)', function () {

    it('View should be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        article = new ArticleRouter(ArticleServiceStub, PictureServiceStub);

      this.spy(res, 'render');

      article.getNewArticle(req, res);

      res.render.calledWith('blog/admin/article').should.be.true;

    }));

  });

  describe('.newArticle(req, res)', function () {

    it('Article should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        article = new ArticleRouter(ArticleServiceStub, PictureServiceStub);

      article.newArticle(req, res, next);

      ArticleServiceStub.findBySlug.called.should.be.true;

    }));

    it('Exists the article to save', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        article = new ArticleRouter(ArticleServiceStub, PictureServiceStub);

      next = this.spy(next);

      article.newArticle(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, null, new Article());

      next.called.should.be.true;

    }));

  });

  describe('.getArticle(req, res, next)', function () {

    it('Article should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        article = new ArticleRouter(ArticleServiceStub, PictureServiceStub);

      article.getArticle(req, res, next);

      ArticleServiceStub.findBySlug.called.should.be.true;
      PictureServiceStub.getPicturesByArticle.called.should.be.true;

    }));
    
    it('Response should be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        article = new ArticleRouter(ArticleServiceStub, PictureServiceStub);

      this.spy(res, 'render');

      article.getArticle(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, null, new Article());
      PictureServiceStub.getPicturesByArticle.callArgWith(1, null, [new Picture()]);

      res.render.calledWith('blog/admin/article').should.be.true;

    }));

    it('Response should not be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        article = new ArticleRouter(ArticleServiceStub, PictureServiceStub);

      next = this.spy(next);

      article.getArticle(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, new Error(), null);
      PictureServiceStub.getPicturesByArticle.callArgWith(1, null, [new Picture()]);

      next.called.should.be.true;
      
    }));

  });

  describe('.updateArticle(req, res, next)', function () {

    it('Article should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        article = new ArticleRouter(ArticleServiceStub, PictureServiceStub);

      article.updateArticle(req, res, next);

      ArticleServiceStub.findBySlug.called.should.be.true;

    }));

    it('Article updated, should be redirected', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        article = new ArticleRouter(ArticleServiceStub, PictureServiceStub);

      this.spy(res, 'redirect');

      article.updateArticle(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, null, new Article());

      res.redirect.called.should.be.true;

    }));

    it('Article not updated', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        article = new ArticleRouter(ArticleServiceStub, PictureServiceStub);

      next = this.spy(next);

      article.updateArticle(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, new Error(), null);

      next.called.should.be.true;
      
    }));

  });

});
