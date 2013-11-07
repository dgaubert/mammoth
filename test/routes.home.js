var support = require('./support'),
    sinon = require('sinon'),
    Home = require('../lib/routes/home');

describe('routes/home', function () {
  var ArticleModel = support.ArticleModel,
      home = new Home(ArticleModel),
      ArticleModelKO = support.ArticleModelKO,
      homeKO = new Home(ArticleModelKO),
      req = support.req,
      res = support.res,
      next = support.next;

  describe('.getHome', function () {

    it('Last article written should be gotten', sinon.test(function () {

      this.spy(ArticleModel, 'exec');
      this.spy(ArticleModel, 'categoriesCount');

      home.getHome(req, res, next);

      ArticleModel.exec.called.should.be.true;
      ArticleModel.categoriesCount.called.should.be.true;

    }));

    it('Render de home view', sinon.test(function () {

      this.spy(res, 'render');
      
      home.getHome(req, res, next);

      res.render.calledWith('home').should.be.true;

    }));

    it('Error in Model', sinon.test(function () {

      next = this.spy(next);

      homeKO.getHome(req, res, next);

      next.called.should.be.true;

    }));

  });

});

