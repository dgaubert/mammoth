  var sinon = require('sinon'),
    errorMiddleware = require('../../lib/middlewares/error')(),
    support = require('../fixtures/support'),
    err = support.err,
    req = support.req,
    res = support.res,
    next = support.next;

describe('middlewares/error', function () {

  describe('.notFound', function () {

    it('Render a 404 view', sinon.test(function () {
      this.spy(res, 'status');
      this.spy(res, 'render');

      errorMiddleware.notFound(req, res, next);

      res.status.calledWith(404).should.be.true;
      res.render.calledWith('error/404').should.be.true;

    }));

  });

  describe('.serverError', function () {

    it('Render a 500 view with error code 500', sinon.test(function () {

      this.spy(res, 'status');
      this.spy(res, 'render');

      errorMiddleware.serverError(err, req, res, next);

      res.status.calledWith(500).should.be.true;
      res.render.calledWith('error/500').should.be.true;

    }));

    it('Render a 500 view with error code 503', sinon.test(function () {

      this.spy(res, 'status');
      this.spy(res, 'render');

      errorMiddleware.serverError(err, req, res, next);

      res.status.calledWith(500).should.be.true;
      res.render.calledWith('error/500').should.be.true;

    }));

  });

});