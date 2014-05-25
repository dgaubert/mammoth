var support = require('../fixtures/support'),
    sinon = require('sinon'),
    guardMiddleware = require('../../lib/middlewares/guard')();

describe('utils/guard', function () {
  var req = support.req,
      res = support.res,
      next = support.next;

  describe('.secure(req, res, next)', function () {

    it('"/blog" with session, should be continued', function () {
      req.path = '/';
      req.session.user = 'user';
      next = sinon.spy();

      guardMiddleware.secure(req, res, next);

      next.called.should.equal(true);
      next.reset();
    });

    it('"/blog" without session, should be continued', function () {
      req.path = '/blog';
      req.session.user = null;
      next = sinon.spy();

      guardMiddleware.secure(req, res, next);

      next.called.should.equal(true);
      next.reset();
    });

    it('"/blog/admin" with session, should be continued', function () {
      req.path = '/blog/admin';
      req.session.user = 'user';
      res.redirect = sinon.spy();
      next = sinon.spy();

      guardMiddleware.secure(req, res, next);

      next.called.should.equal(true);
      res.redirect.called.should.equal(false);
      next.reset();
      res.redirect.reset();
    });

    it('"/blog/admin" without session, should be redirected', function () {
      req.path = '/blog/admin';
      req.session.user = null;
      res.redirect = sinon.spy();
      next = sinon.spy();

      guardMiddleware.secure(req, res, next);

      next.called.should.equal(false);
      res.redirect.called.should.equal(true);
      next.reset();
      res.redirect.reset();
    });

    it('"/blog/admin/users" with session, should be continued', function () {
      req.path = '/blog/admin/users';
      req.session.user = 'user';
      res.redirect = sinon.spy();
      next = sinon.spy();

      guardMiddleware.secure(req, res, next);

      next.called.should.equal(true);
      res.redirect.called.should.equal(false);
      next.reset();
      res.redirect.reset();
    });

    it('"/blog/admin/users" without session, should be redirected', function () {
      req.path = '/blog/admin/users';
      req.session.user = null;
      res.redirect = sinon.spy();
      next = sinon.spy();

      guardMiddleware.secure(req, res, next);

      next.called.should.equal(false);
      res.redirect.called.should.equal(true);
      next.reset();
      res.redirect.reset();
    });

  });

});
