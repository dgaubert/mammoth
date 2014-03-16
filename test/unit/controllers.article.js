var sinon = require('sinon'),
    Article = require('../../lib/models/article'),
    Picture = require('../../lib/models/picture'),
    ArticleService = require('../../lib/services/article')(Article),
    PictureService = require('../../lib/services/picture')(Picture),
    ArticleController = require('../../lib/controllers/article'),
    ArticleFake = require('../fixtures/article'),
    PictureFake = require('../fixtures/picture'),
    support = require('../fixtures/support'),
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

  describe('.list(req, res, next)', function () {

    it('Articles should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          PictureServiceStub = this.stub(PictureService),
          articleController = ArticleController(ArticleServiceStub, PictureServiceStub);

      articleController.list(req, res, next);

      ArticleServiceStub.find.called.should.be.true;

    }));

    it('Response should be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          PictureServiceStub = this.stub(PictureService),
          articleController = ArticleController(ArticleServiceStub, PictureServiceStub);

      this.spy(res, 'render');

      articleController.list(req, res, next);

      ArticleServiceStub.find.callArgWith(0, null, [new ArticleFake()]);

      res.render.calledWith('blog/admin/articles').should.be.true;

    }));

    it('Response should not be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          PictureServiceStub = this.stub(PictureService),
          articleController = ArticleController(ArticleServiceStub, PictureServiceStub);

      next = this.spy(next);

      articleController.list(req, res, next);

      ArticleServiceStub.find.callArgWith(0, new Error(), null);

      next.called.should.be.true;

    }));


  });

  describe('.getNewArticle(req, res)', function () {

    it('View should be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          PictureServiceStub = this.stub(PictureService),
          articleController = ArticleController(ArticleServiceStub, PictureServiceStub);

      this.spy(res, 'render');

      articleController.show(req, res);

      res.render.calledWith('blog/admin/article').should.be.true;

    }));

  });

  describe('.create(req, res)', function () {

    it('Article should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          PictureServiceStub = this.stub(PictureService),
          articleController = ArticleController(ArticleServiceStub, PictureServiceStub);

      articleController.create(req, res, next);

      ArticleServiceStub.findBySlug.called.should.be.true;

    }));

    it('Exists the article to save', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          PictureServiceStub = this.stub(PictureService),
          articleController = ArticleController(ArticleServiceStub, PictureServiceStub);

      next = this.spy(next);

      articleController.create(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, null, new ArticleFake());

      next.called.should.be.true;

    }));

  });

  describe('.getArticle(req, res, next)', function () {

    it('Article should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          PictureServiceStub = this.stub(PictureService),
          articleController = ArticleController(ArticleServiceStub, PictureServiceStub);

      articleController.retrieve(req, res, next);

      ArticleServiceStub.findBySlug.called.should.be.true;
      PictureServiceStub.findByArticle.called.should.be.true;

    }));

    it('Response should be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          PictureServiceStub = this.stub(PictureService),
          articleController = ArticleController(ArticleServiceStub, PictureServiceStub);

      this.spy(res, 'render');

      articleController.retrieve(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, null, new ArticleFake());
      PictureServiceStub.findByArticle.callArgWith(1, null, [new PictureFake()]);

      res.render.calledWith('blog/admin/article').should.be.true;

    }));

    it('Response should not be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          PictureServiceStub = this.stub(PictureService),
          articleController = ArticleController(ArticleServiceStub, PictureServiceStub);

      next = this.spy(next);

      articleController.retrieve(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, new Error(), null);
      PictureServiceStub.findByArticle.callArgWith(1, null, [new PictureFake()]);

      next.called.should.be.true;

    }));

  });

  describe('.updateArticle(req, res, next)', function () {

    it('Article should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          PictureServiceStub = this.stub(PictureService),
          articleController = ArticleController(ArticleServiceStub, PictureServiceStub);

      articleController.update(req, res, next);

      ArticleServiceStub.findBySlug.called.should.be.true;

    }));

    it('Article updated, should be redirected', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        articleController = ArticleController(ArticleServiceStub, PictureServiceStub);

      this.spy(res, 'redirect');

      articleController.update(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, null, new ArticleFake());

      res.redirect.called.should.be.true;

    }));

    it('Article not updated', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
        PictureServiceStub = this.stub(PictureService),
        articleController = ArticleController(ArticleServiceStub, PictureServiceStub);

      next = this.spy(next);

      articleController.update(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, new Error(), null);

      next.called.should.be.true;

    }));

  });

});
