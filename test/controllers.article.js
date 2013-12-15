var sinon = require('sinon'),
    Article = require('../lib/models/article'),
    Picture = require('../lib/models/picture'),
    ArticleService = require('../lib/services/article')(Article),
    PictureService = require('../lib/services/picture')(Picture),
    ArticleController = require('../lib/controllers/article'),
    support = require('./support/support'),
    article = support.article;
    picture = support.picture;
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/article', function () {

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
        articleController = new ArticleController(ArticleServiceStub, PictureServiceStub);

      articleController.getArticles(req, res, next);

      ArticleServiceStub.findAll.called.should.be.true;

    }));
    
    it('Response should be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        articleController = new ArticleController(ArticleServiceStub, PictureServiceStub);

      this.spy(res, 'render');

      articleController.getArticles(req, res, next);

      ArticleServiceStub.findAll.callArgWith(0, null, [article]);

      res.render.calledWith('blog/admin/articles').should.be.true;

    }));

    it('Response should not be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        articleController = new ArticleController(ArticleServiceStub, PictureServiceStub);

      next = this.spy(next);

      articleController.getArticles(req, res, next);

      ArticleServiceStub.findAll.callArgWith(0, new Error(), null);

      next.called.should.be.true;

    }));
    

  });

  describe('.getNewArticle(req, res)', function () {

    it('View should be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        articleController = new ArticleController(ArticleServiceStub, PictureServiceStub);

      this.spy(res, 'render');

      articleController.getNewArticle(req, res);

      res.render.calledWith('blog/admin/article').should.be.true;

    }));

  });

  describe('.newArticle(req, res)', function () {

    it('Article should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        articleController = new ArticleController(ArticleServiceStub, PictureServiceStub);

      articleController.newArticle(req, res, next);

      ArticleServiceStub.findBySlug.called.should.be.true;

    }));

    it('Exists the article to save', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        articleController = new ArticleController(ArticleServiceStub, PictureServiceStub);

      next = this.spy(next);

      articleController.newArticle(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, null, article);

      next.called.should.be.true;

    }));

  });

  describe('.getArticle(req, res, next)', function () {

    it('Article should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        articleController = new ArticleController(ArticleServiceStub, PictureServiceStub);

      articleController.getArticle(req, res, next);

      ArticleServiceStub.findBySlug.called.should.be.true;
      PictureServiceStub.getPicturesByArticle.called.should.be.true;

    }));
    
    it('Response should be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        articleController = new ArticleController(ArticleServiceStub, PictureServiceStub);

      this.spy(res, 'render');

      articleController.getArticle(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, null, article);
      PictureServiceStub.getPicturesByArticle.callArgWith(1, null, [picture]);

      res.render.calledWith('blog/admin/article').should.be.true;

    }));

    it('Response should not be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        articleController = new ArticleController(ArticleServiceStub, PictureServiceStub);

      next = this.spy(next);

      articleController.getArticle(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, new Error(), null);
      PictureServiceStub.getPicturesByArticle.callArgWith(1, null, [picture]);

      next.called.should.be.true;
      
    }));

  });

  describe('.updateArticle(req, res, next)', function () {

    it('Article should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        articleController = new ArticleController(ArticleServiceStub, PictureServiceStub);

      articleController.updateArticle(req, res, next);

      ArticleServiceStub.findBySlug.called.should.be.true;

    }));

    it('Article updated, should be redirected', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        articleController = new ArticleController(ArticleServiceStub, PictureServiceStub);

      this.spy(res, 'redirect');

      articleController.updateArticle(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, null, article);

      res.redirect.called.should.be.true;

    }));

    it('Article not updated', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        articleController = new ArticleController(ArticleServiceStub, PictureServiceStub);

      next = this.spy(next);

      articleController.updateArticle(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, new Error(), null);

      next.called.should.be.true;
      
    }));

  });

});
