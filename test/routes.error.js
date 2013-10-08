var support = require('./support'),
    sinon = require('sinon'),
    Error = require('../lib/routes/error');

describe('routes/error', function () {
  var error = new Error(),
      err = support.err,
      req = support.req,
      res = support.res,
      next = support.next;

  describe('.notFound', function () {

    it('Render a 404 view', function () {
      res.status = sinon.spy();
      res.render = sinon.spy();

      error.notFound(req, res, next);

      res.status.calledWith(404).should.be.true;
      res.render.calledWith('error/404').should.be.true;
    });

  });

  describe('.serverError', function () {

    it('Render a 500 view with error code 500', function () {
      res.status = sinon.spy();
      res.render = sinon.spy();

      error.serverError(err, req, res, next);

      res.status.calledWith(500).should.be.true;
      res.render.calledWith('error/500').should.be.true;
    });

    it('Render a 500 view with error code 503', function () {
      res.status = sinon.spy();
      res.render = sinon.spy();

      error.serverError(err, req, res, next);

      res.status.calledWith(500).should.be.true;
      res.render.calledWith('error/500').should.be.true;
    });

  });

});