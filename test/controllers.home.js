var sinon = require('sinon'),
    Article = require('../lib/models/article'),
    ArticleService = require('../lib/services/article')(Article),
    HomeController = require('../lib/controllers/home'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/home', function () {


  describe('.getHome', function () {

    it('Last article written should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          home = new HomeController(ArticleServiceStub);

      home.getHome(req, res, next);

      ArticleServiceStub.findLast.called.should.be.true;
      ArticleServiceStub.categoriesCount.called.should.be.true;

    }));

    it('Render de home view', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          home = new HomeController(ArticleServiceStub);

      this.spy(res, 'render');
      
      home.getHome(req, res, next);

      ArticleServiceStub.findLast.callArgWith(0, null, [new Article()]);
      ArticleServiceStub.categoriesCount.callArgWith(0, null, 1);

      res.render.calledWith('home').should.be.true;

    }));

    it('Error in Article', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          home = new HomeController(ArticleServiceStub);

      next = this.spy(next);

      home.getHome(req, res, next);

      ArticleServiceStub.findLast.callArgWith(0, new Error(), null);
      ArticleServiceStub.categoriesCount.callArgWith(0, null, 1);

      next.called.should.be.true;

    }));

  });

});
