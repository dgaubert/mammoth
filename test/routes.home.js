var sinon = require('sinon'),
    Article = require('./support/article'),
    Home = require('../lib/routes/home'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/home', function () {

  describe('.getHome', function () {

    it('Last article written should be gotten', sinon.test(function () {

      var home = new Home(Article.ok());

      this.spy(Article, 'exec');
      this.spy(Article, 'categoriesCount');

      home.getHome(req, res, next);

      Article.exec.called.should.be.true;
      Article.categoriesCount.called.should.be.true;

    }));

    it('Render de home view', sinon.test(function () {

      var home = new Home(Article.ok());

      this.spy(res, 'render');
      
      home.getHome(req, res, next);

      res.render.calledWith('home').should.be.true;

    }));

    it('Error in Article', sinon.test(function () {

      var home = new Home(Article.ko());

      next = this.spy(next);

      home.getHome(req, res, next);

      next.called.should.be.true;

    }));

  });

});

