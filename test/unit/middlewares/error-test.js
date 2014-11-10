/* jshint expr: true */
'use strict';

var sinon = require('sinon');

describe('middlewares/error', function () {
  var ErrorMiddleware = require('../../../lib/middlewares/error');
  var res = {
    status: function () {},
    render: function () {},
    redirect: function () {}
  };
  var req = {
    body: {
      title: 'irrelevantTitle',
      author: 'irrelevantAuthor',
      slug: 'irrelevantSlug',
      category: 'irrelevantCategory',
      abstract: 'irrelevantAbstract',
      content: 'irrelevantContent',
      tags: 'irrelevantTag1,irrelevantTag2'
    },
    params: {
      slug: 'irrelevantSlug'
    }
  };
  var next = function () {};
  var err = {};

  var sandbox;
  var errorMiddleware;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    res.status = sandbox.spy(res, 'status');
    res.render = sandbox.spy(res, 'render');
    res.redirect = sandbox.spy(res, 'redirect');
    next = sandbox.spy(next);

    errorMiddleware  = new ErrorMiddleware();
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('.notFound', function () {

    it('Render a 404 view', function () {
      errorMiddleware.notFound(req, res, next);

      res.status.calledWith(404).should.equal(true);
      res.render.calledWith('error/404').should.equal(true);
    });

  });

  describe('.serverError', function () {

    it('Render a 500 view with error code 500', function () {
      errorMiddleware.serverError(err, req, res, next);

      res.status.calledWith(500).should.equal(true);
      res.render.calledWith('error/500').should.equal(true);
    });

    it('Render a 500 view with error code 503', function () {
      errorMiddleware.serverError(err, req, res, next);

      res.status.calledWith(500).should.equal(true);
      res.render.calledWith('error/500').should.equal(true);
    });

  });

});
