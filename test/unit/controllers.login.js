/* jslint node:true */
/* global describe: true, it:true*/
'use strict';

var sinon = require('sinon'),
    User = require('../../lib/models/user'),
    UserService = require('../../lib/services/user')(User),
    LoginController = require('../../lib/controllers/login'),
    support = require('../fixtures/support'),
    req = support.req,
    res = support.res,
    next = support.next,
    UserFake = require('../fixtures/user');

describe('controllers/login', function () {


  // TODO: using async.waterfall test doesn't work properly
  describe.skip('.check', function () {

    it('User should be found', sinon.test(function () {
      var userServiceStub = this.stub(UserService),
          loginController = new LoginController(userServiceStub);

      loginController.check(req, res, next);

      userServiceStub.findByUsername.called.should.equal(true);

    }));

    // TODO: something is wrong to test pwd, is needed inject PWD
    // as dependency to the controller
    it('Login OK, regenerate session', sinon.test(function () {
      var userServiceStub = this.stub(UserService),
          loginController = new LoginController(userServiceStub);

      req.body.username = '';
      req.body.password = 'hola';

      this.spy(req.session, 'regenerate');
      this.spy(res, 'redirect');

      loginController.check(req, res, next);

      userServiceStub.findByUsername.callArgWith(1, null, new UserFake());

      req.session.regenerate.called.should.equal(true);
      // res.redirect.called.should.equal(false);

    }));

    it('Wrong password, redirect', sinon.test(function () {
      var userServiceStub = this.stub(UserService),
          loginController = new LoginController(userServiceStub);

      req.body.username = 'dgaubert';
      req.body.password = 'wrong';

      this.spy(req.session, 'regenerate');
      this.spy(res, 'redirect');

      loginController.check(req, res, next);

      req.session.regenerate.called.should.equal(false);
      res.redirect.called.should.equal(true);

    }));

    it('Wrong user, redirect', sinon.test(function () {
      var userServiceStub = this.stub(UserService),
          loginController = new LoginController(userServiceStub);

      req.body.username = 'dgaubert';
      req.body.password = 'mammoth';

      this.spy(req.session, 'regenerate');
      this.spy(res, 'redirect');

      loginController.check(req, res, next);

      userServiceStub.findByUsername.callArgWith(1, null);

      req.session.regenerate.called.should.equal(false);
      res.redirect.called.should.equal(true);

    }));

    it('Error in DB', sinon.test(function () {
      var userServiceStub = this.stub(UserService),
          loginController = new LoginController(userServiceStub);

      req.body.username = 'dgaubert';
      req.body.password = 'mammoth';

      next = this.spy(next);

      loginController.check(req, res, next);

      userServiceStub.findByUsername.callArgWith(1, new Error(), null);

      next.called.should.equal(true);

    }));

  });

  describe('.logout', function () {

    it('Destroy sesion', sinon.test(function () {
      var userServiceStub = this.stub(UserService),
          loginController = new LoginController(userServiceStub);

      this.spy(req.session, 'destroy');

      loginController.logout(req, res);

      req.session.destroy.called.should.equal(true);

    }));

  });

  describe('.show', function () {

    it('Get view to login', sinon.test(function () {
      var userServiceStub = this.stub(UserService),
          loginController = new LoginController(userServiceStub);

      this.spy(res, 'render');

      loginController.show(req, res);

      res.render.calledWith('blog/admin/login').should.equal(true);

    }));

  });

});
