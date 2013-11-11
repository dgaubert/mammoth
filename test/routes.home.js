var support = require('./support'),
    sinon = require('sinon'),
    Home = require('../lib/routes/home'),
    Model = support.Model,
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/home', function () {

  // Set model
  Model.setModel(support.article);

  describe('.getHome', function () {

    it('Last article written should be gotten', sinon.test(function () {

      var home = new Home(Model.ok());

      this.spy(Model, 'exec');
      this.spy(Model, 'categoriesCount');

      home.getHome(req, res, next);

      Model.exec.called.should.be.true;
      Model.categoriesCount.called.should.be.true;

    }));

    it('Render de home view', sinon.test(function () {

      var home = new Home(Model.ok());

      this.spy(res, 'render');
      
      home.getHome(req, res, next);

      res.render.calledWith('home').should.be.true;

    }));

    it('Error in Model', sinon.test(function () {

      var home = new Home(Model.ko());

      next = this.spy(next);

      home.getHome(req, res, next);

      next.called.should.be.true;

    }));

  });

});

