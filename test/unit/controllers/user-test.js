/* jshint expr: true */
'use strict';

var sinon = require('sinon');

describe('controllers/user', function () {

  var UserController = require('../../../lib/controllers/user');
  var userController;
  var req = {
    body: {
      username: 'irrelevantUsername',
      password: 'irrelevantPassword'
    },
    params: {
      username: 'irrelevantUsername',
    }
  };
  var res = {
    render: function () {},
    redirect: function () {}
  };
  var next = function () {};

  var UserService = function () {};
  UserService.prototype.list = function () {};
  UserService.prototype.show = function () {};
  UserService.prototype.create = function () {};
  UserService.prototype.retrieve = function () {};
  UserService.prototype.update = function () {};

  var sandbox;
  var userServiceStub;
  var user = req.body;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    res.render = sandbox.spy(res, 'render');
    res.redirect = sandbox.spy(res, 'redirect');
    next = sandbox.spy(next);

    userServiceStub = sandbox.stub(new UserService());
    userController = new UserController(userServiceStub);
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('.show', function () {

    it('should render admin view', function () {
      userController.show(req, res);

      res.render.calledWith('blog/admin/user').should.equal(true);
    });

  });


  describe('.create(req, res)', function () {

    it('should delegate to the service the user\'s creation', function () {
      userServiceStub.create.callsArgWith(1, null, user);

      userController.create(req, res, next);

      userServiceStub.create.called.should.be.true;
    });

    it('should redirect to the user created', function () {
      userServiceStub.create.callsArgWith(1, null, user);

      userController.create(req, res, next);

      res.redirect.calledWith('/blog/admin/users/' + user.username).should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      userServiceStub.create.callsArgWith(1, err, null);

      userController.create(req, res, next);

      next.called.should.equal(true);
    });

  });

  describe('.list(req, res, next)', function () {

    it('should use the "list" method of user service', function () {
      userServiceStub.list.callsArgWith(0, null, [user]);

      userController.list(req, res, next);

      userServiceStub.list.called.should.be.true;
    });

    it('should render "blog/admin/users" view', function () {
      userServiceStub.list.callsArgWith(0, null, [user]);

      userController.list(req, res, next);

      res.render.calledWith('blog/admin/users').should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      userServiceStub.list.callsArgWith(0, err, null);

      userController.list(req, res, next);

      next.calledWith(err).should.be.true;
    });

  });

  describe('.show(req, res)', function () {

    it('should render "blog/admin/user" view', function () {
      userController.show(req, res);

      res.render.calledWith('blog/admin/user').should.equal(true);
    });

  });


  describe('.retrieve(req, res, next)', function () {

    it('should use the "retrieve" method of user service', function () {
      userServiceStub.retrieve.callsArgWith(1, null, user);

      userController.retrieve(req, res, next);

      userServiceStub.retrieve.called.should.be.true;
    });

    it('should render "blog/admin/user" user view', function () {
      userServiceStub.retrieve.callsArgWith(1, null, user);

      userController.retrieve(req, res, next);

      res.render.calledWith('blog/admin/user').should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      userServiceStub.retrieve.callsArgWith(1, err, null);

      userController.retrieve(req, res, next);

      next.calledWith(err).should.be.true;
    });

  });

  describe('.update(req, res, next)', function () {

    it('should delegate to user\'s service', function () {
      userServiceStub.update.callsArgWith(2, null, user);

      userController.update(req, res, next);

      userServiceStub.update.called.should.be.true;
    });

    it('should redirect to updated user', function () {
      userServiceStub.update.callsArgWith(2, null, user);

      userController.update(req, res, next);

      res.redirect.calledWith('/blog/admin/users/' + user.username).should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      userServiceStub.update.callsArgWith(2, err, null);

      userController.update(req, res, next);

      next.called.should.equal(true);
    });

  });

});
