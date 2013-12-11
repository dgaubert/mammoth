var sinon = require('sinon'),
    Article = require('./support/article'),
    ArticleService = require('../lib/services/article-service'),
    HomeRouter = require('../lib/routes/home'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/home', function () {
  var ArticleServiceStub = sinon.stub(ArticleService),
      home = new HomeRouter(ArticleServiceStub);

  describe('.getHome', function () {

    it('Last article written should be gotten', sinon.test(function () {

      home.getHome(req, res, next);

      ArticleServiceStub.findLast.called.should.be.true;
      ArticleServiceStub.categoriesCount.called.should.be.true;

    }));

    it('Render de home view', sinon.test(function () {

      this.spy(res, 'render');
      
      home.getHome(req, res, next);

      ArticleServiceStub.findLast.callArgWith(0, null, [new Article()]);
      ArticleServiceStub.categoriesCount.callArgWith(0, null, 1);

      res.render.calledWith('home').should.be.true;

    }));

    it('Error in Article', sinon.test(function () {

      next = this.spy(next);

      home.getHome(req, res, next);

      ArticleServiceStub.findLast.callArgWith(0, new Error(), null);
      ArticleServiceStub.categoriesCount.callArgWith(0, null, 1);      

      next.called.should.be.true;

    }));

  });

});

