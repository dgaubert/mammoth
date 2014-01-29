/* jslint node:true */
/* global describe: true, it:true*/
'use strict';

var sinon = require('sinon'),
    User = require('../lib/models/user'),
    userService = require('../lib/services/user')(User),
    userController = require('../lib/controllers/user'),
    UserFake = require('./support/user'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/user', function () {

  describe('.list(req, res)', function () {

    it('Users should be gotten', sinon.test(function () {
      var userServiceStub = this.stub(userService),
          userCntlr = new userController(userServiceStub);
      
      userCntlr.list(req, res, next);

      userServiceStub.find.called.should.equal(true);

    }));

    it('Response should be rendered', sinon.test(function () {
      var userServiceStub = this.stub(userService),
          userCntlr = new userController(userServiceStub);

      this.spy(res, 'render');

      userCntlr.list(req, res, next);

      userServiceStub.find.callArgWith(0, null, [new UserFake()]);

      res.render.calledWith('blog/admin/users').should.equal(true);

    }));

  });

  describe('.show(req, res)', function () {

    it('Response should be rendered', sinon.test(function () {
      var userServiceStub = this.stub(userService),
          userCntlr = new userController(userServiceStub);

      this.spy(res, 'render');

      userCntlr.show(req, res, next);

      res.render.calledWith('blog/admin/user').should.equal(true);

    }));

  });

  describe('.create(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {
      var userServiceStub = this.stub(userService),
          userCntlr = new userController(userServiceStub);

      userCntlr.create(req, res, next);

      userServiceStub.findByUsername.called.should.equal(true);

    }));

    it('Exists the user to save', sinon.test(function () {
      var userServiceStub = this.stub(userService),
          userCntlr = new userController(userServiceStub);

      next = this.spy(next);

      userCntlr.create(req, res, next);

      userServiceStub.findByUsername.callArgWith(1, null, new UserFake());

      next.called.should.equal(true);

    }));

  });


  describe('.retrieve(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {
      var userServiceStub = this.stub(userService),
          userCntlr = new userController(userServiceStub);

      userCntlr.retrieve(req, res, next);

      userServiceStub.findByUsername.called.should.equal(true);

    }));
    
    it('Response should be rendered', sinon.test(function () {
      var userServiceStub = this.stub(userService),
          userCntlr = new userController(userServiceStub);

      this.spy(res, 'render');

      userCntlr.retrieve(req, res, next);

      userServiceStub.findByUsername.callArgWith(1, null, new UserFake());

      res.render.calledWith('blog/admin/user').should.equal(true);

    }));

    it('Response should not be rendered', sinon.test(function () {
      var userServiceStub = this.stub(userService),
          userCntlr = new userController(userServiceStub);

      next = this.spy(next);

      userCntlr.retrieve(req, res, next);

      userServiceStub.findByUsername.callArgWith(1, new Error(), null);

      next.called.should.equal(true);
      
    }));

  });

  describe('.update(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {
      var userServiceStub = this.stub(userService),
          userCntlr = new userController(userServiceStub);

      // fake request body form
      req.body.username = 'test';

      userCntlr.update(req, res, next);

      userServiceStub.findByUsername.called.should.equal(true);

    }));

  });

});
