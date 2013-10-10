var support = require('./support'),
    sinon = require('sinon'),
    Home = require('../lib/routes/home');

describe('routes/home', function () {
  var SummaryModel = support.SummaryModel,
      home = new Home(SummaryModel),
      SummaryModelKO = support.SummaryModelKO,
      homeKO = new Home(SummaryModelKO),
      req = support.req,
      res = support.res,
      next = support.next;

  describe('.getHome', function () {

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

