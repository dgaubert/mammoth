var sinon = require('sinon'),
    Article = require('../lib/models/article'),
    ArticleService = require('../lib/services/article')(Article),
    HomeController = require('../lib/controllers/home'),
    support = require('./support/support'),
    ArticleFake = require('./support/article'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/home', function () {


  describe('.show', function () {

    it('Last article written should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          home = new HomeController(ArticleServiceStub);

      home.show(req, res, next);

      ArticleServiceStub.findLast.called.should.be.true;
      ArticleServiceStub.countCategories.called.should.be.true;

    }));

    it('Render de home view', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          home = new HomeController(ArticleServiceStub);

      this.spy(res, 'render');
      
      home.show(req, res, next);

      ArticleServiceStub.findLast.callArgWith(0, null, [new ArticleFake()]);
      ArticleServiceStub.countCategories.callArgWith(0, null, 1);

      res.render.calledWith('home').should.be.true;

    }));

    it('Error in Article', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          home = new HomeController(ArticleServiceStub);

      next = this.spy(next);

      home.show(req, res, next);

      ArticleServiceStub.findLast.callArgWith(0, new Error(), null);
      ArticleServiceStub.countCategories.callArgWith(0, null, 1);

      next.called.should.be.true;

    }));

  });

});
