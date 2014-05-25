/* jslint node:true */
/* global describe: true, it:true*/
'use strict';

var sinon = require('sinon'),
    User = require('../../lib/models/user'),
    UserService = require('../../lib/services/user')(User),
    UserController = require('../../lib/controllers/user'),
    UserFake = require('../fixtures/user'),
    support = require('../fixtures/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/user', function () {

  describe('.list(req, res)', function () {

    it('Users should be gotten', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          userController = UserController(UserServiceStub);

      userController.list(req, res, next);

      UserServiceStub.find.called.should.equal(true);

    }));

    it('Response should be rendered', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          userController = UserController(UserServiceStub);

      this.spy(res, 'render');

      userController.list(req, res, next);

      UserServiceStub.find.callArgWith(0, null, [new UserFake()]);

      res.render.calledWith('blog/admin/users').should.equal(true);

    }));

  });

  describe('.show(req, res)', function () {

    it('Response should be rendered', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          userController = UserController(UserServiceStub);

      this.spy(res, 'render');

      userController.show(req, res, next);

      res.render.calledWith('blog/admin/user').should.equal(true);

    }));

  });

  describe('.create(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          userController = UserController(UserServiceStub);

      userController.create(req, res, next);

      UserServiceStub.findByUsername.called.should.equal(true);

    }));

    it('Exists the user to save', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          userController = UserController(UserServiceStub);

      next = this.spy(next);

      userController.create(req, res, next);

      UserServiceStub.findByUsername.callArgWith(1, null, new UserFake());

      next.called.should.equal(true);

    }));

  });


  describe('.retrieve(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          userController = UserController(UserServiceStub);

      userController.retrieve(req, res, next);

      UserServiceStub.findByUsername.called.should.equal(true);

    }));

    it('Response should be rendered', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          userController = UserController(UserServiceStub);

      this.spy(res, 'render');

      userController.retrieve(req, res, next);

      UserServiceStub.findByUsername.callArgWith(1, null, new UserFake());

      res.render.calledWith('blog/admin/user').should.equal(true);

    }));

    it('Response should not be rendered', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          userController = UserController(UserServiceStub);

      next = this.spy(next);

      userController.retrieve(req, res, next);

      UserServiceStub.findByUsername.callArgWith(1, new Error(), null);

      next.called.should.equal(true);

    }));

  });

  describe('.update(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          userController = UserController(UserServiceStub);

      // fake request body form
      req.body.username = 'test';

      userController.update(req, res, next);

      UserServiceStub.findByUsername.called.should.equal(true);

    }));

  });

});
