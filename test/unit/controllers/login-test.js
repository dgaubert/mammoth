'use strict';

var sinon = require('sinon');

describe('controllers/login', function () {
  var LoginController = require('../../../lib/controllers/login');
  var loginController;
  var req = {
    body: {
      username: 'irrelevantUsername',
      password: 'irrelevantPassword'
    },
    session: {
      regenerate: function () {},
      destroy: function () {}
    }
  };
  var res = {
    render: function () {},
    redirect: function () {}
  };
  var next = function () {};

  var sandbox;
  var loginServiceStub;
  var LoginService = function () {};
  LoginService.prototype.check = function () {};

  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    res.render = sandbox.spy(res, 'render');
    res.redirect = sandbox.spy(res, 'redirect');
    next = sandbox.spy(next);

    loginServiceStub = sandbox.stub(new LoginService()),
    loginController = new LoginController(loginServiceStub);
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('.show', function () {

    it('should render login view', function () {
      loginController.show(req, res);

      res.render.calledWith('blog/admin/login').should.equal(true);
    });

  });

  describe('.logout', function () {

    it('should destroy session', function () {
      req.session.destroy = sandbox.stub().callsArgWith(0);

      loginController.logout(req, res);

      req.session.destroy.called.should.equal(true);
    });

    it('should redirect to blog view', function () {
      req.session.destroy = sandbox.stub().callsArgWith(0);

      loginController.logout(req, res);

      res.redirect.calledWith('/blog').should.equal(true);
    });

  });

  describe('.check', function () {

    it('should pass the login', function () {
      loginServiceStub.check.callsArgWith(2, null, {});
      req.session.regenerate = sandbox.stub().callsArgWith(0);

      loginController.check(req, res, next);

      res.redirect.calledWith('/blog/admin').should.equal(true);
    });

    it('shouldn\'t pass the login', function () {
      var err = new Error();

      loginServiceStub.check.callsArgWith(2, err, null);

      loginController.check(req, res, next);

      res.redirect.calledWith('/blog/login').should.equal(true);
    });

  });

});
