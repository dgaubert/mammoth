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

    it('Last article written should be gotten', function () {
      var ArticleModelMock = sinon.mock(ArticleModel);
      ArticleModelMock.expects('getLast').once();
      ArticleModelMock.expects('categoriesCount').once();

      home.getHome(req, res, next);

      ArticleModelMock.verify();
    });

    it('Render de home view', function () {
      res.render = sinon.spy();
      
      home.getHome(req, res, next);

      res.render.calledWith('home').should.be.true;
      res.render.reset();
    });

    it('Error in Model', function () {
      next = sinon.spy();

      homeKO.getHome(req, res, next);

      next.called.should.be.true;
      next.reset();
    }); 

  });

});

