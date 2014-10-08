'use strict';

var sinon = require('sinon'),
    Article = require('../../lib/models/article'),
    ArticleService = require('../../lib/services/article')(Article),
    HomeController = require('../../lib/controllers/home'),
    support = require('../fixtures/support'),
    ArticleFake = require('../fixtures/article'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/home', function () {


  describe('.show', function () {

    it('Last article written should be gotten', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          homeController = HomeController(articleServiceStub);

      homeController.show(req, res, next);

      articleServiceStub.findLast.called.should.equal(true);
      articleServiceStub.countCategories.called.should.equal(true);

    }));

    it('Render de home view', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          homeController = HomeController(articleServiceStub);

      this.spy(res, 'render');

      homeController.show(req, res, next);

      articleServiceStub.findLast.callArgWith(0, null, [new ArticleFake()]);
      articleServiceStub.countCategories.callArgWith(0, null, 1);

      res.render.calledWith('home').should.equal(true);

    }));

    it('Error in Article', sinon.test(function () {
      var articleServiceStub = this.stub(ArticleService),
          homeController = HomeController(articleServiceStub);

      next = this.spy(next);

      homeController.show(req, res, next);

      articleServiceStub.findLast.callArgWith(0, new Error(), null);
      articleServiceStub.countCategories.callArgWith(0, null, 1);

      next.called.should.equal(true);

    }));

  });

});
