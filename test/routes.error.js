var sinon = require('sinon'),
    Error = require('../lib/routes/error');

describe('routes/error', function () {
  var error = new Error(),
      err = {status: 500},
      req = {url: '/'},
      res = {
        status: sinon.spy(),
        render: sinon.spy()
      },
      next = sinon.spy();

  describe('.notFound', function () {

    it('Render a 404 view', function () {
      error.notFound(req, res, next);

      res.status.calledWith(404).should.be.true;
      res.render.calledWith('error/404').should.be.true;
    });

  });

  describe('.serverError', function () {

    it('Render a 500 view with error code 500', function () {
      error.serverError(err, req, res, next);

      res.status.calledWith(500).should.be.true;
      res.render.calledWith('error/500').should.be.true;
    });

    it('Render a 500 view with error code 503', function () {
      err.status = 503;

      error.serverError(err, req, res, next);

      res.status.calledWith(500).should.be.true;
      res.render.calledWith('error/500').should.be.true;
    });

  });

});