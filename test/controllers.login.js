/* jslint node:true */
/* global describe: true, it:true*/
'use strict';

var sinon = require('sinon'),
    User = require('../lib/models/user'),
    userService = require('../lib/services/user')(User),
    loginController = require('../lib/controllers/login'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/login', function () {

  describe('.check', function () {

    it('User should be found', sinon.test(function () {
      var userServiceStub = this.stub(userService),
          loginCntlr = new loginController(userServiceStub);

      loginCntlr.check(req, res, next);

      userServiceStub.findByUsername.called.should.equal(true);

    }));

    // TODO: something is wrong to test pwd
    it.skip('Login OK, regenerate session', sinon.test(function () {
      var userServiceStub = this.stub(userService),
          loginCntlr = new loginController(userServiceStub);

      req.body.username = '';
      req.body.password = '';

      this.spy(req.session, 'regenerate');
      this.spy(res, 'redirect');

      loginCntlr.check(req, res, next);

      userServiceStub.findByUsername.callArgWith(1, null, new User());

      req.session.regenerate.called.should.equal(true);
      res.redirect.called.should.equal(false);

    }));

    it.skip('Wrong password, redirect', sinon.test(function () {
      var userServiceStub = this.stub(userService),
          loginCntlr = new loginController(userServiceStub);

      req.body.username = 'dgaubert';
      req.body.password = 'wrong';
      
      this.spy(req.session, 'regenerate');
      this.spy(res, 'redirect');

      loginCntlr.check(req, res, next);

      req.session.regenerate.called.should.equal(false);
      res.redirect.called.should.equal(true);

    }));

    it('Wrong user, redirect', sinon.test(function () {
      var userServiceStub = this.stub(userService),
          loginCntlr = new loginController(userServiceStub);

      req.body.username = 'dgaubert';
      req.body.password = 'mammoth';

      this.spy(req.session, 'regenerate');
      this.spy(res, 'redirect');

      loginCntlr.check(req, res, next);

      userServiceStub.findByUsername.callArgWith(1, null);

      req.session.regenerate.called.should.equal(false);
      res.redirect.called.should.equal(true);

    }));

    it('Error in DB', sinon.test(function () {
      var userServiceStub = this.stub(userService),
          loginCntlr = new loginController(userServiceStub);

      req.body.username = 'dgaubert';
      req.body.password = 'mammoth';

      next = this.spy(next);

      loginCntlr.check(req, res, next);

      userServiceStub.findByUsername.callArgWith(1, new Error(), null);

      next.called.should.equal(true);

    }));

  });

  describe('.logout', function () {

    it('Destroy sesion', sinon.test(function () {
      var userServiceStub = this.stub(userService),
          loginCntlr = new loginController(userServiceStub);

      this.spy(req.session, 'destroy');

      loginCntlr.logout(req, res);

      req.session.destroy.called.should.equal(true);

    }));

  });

  describe('.show', function () {

    it('Get view to login', sinon.test(function () {
      var userServiceStub = this.stub(userService),
          loginCntlr = new loginController(userServiceStub);

      this.spy(res, 'render');

      loginCntlr.show(req, res);

      res.render.calledWith('blog/admin/login').should.equal(true);
    
    }));

  });

});
