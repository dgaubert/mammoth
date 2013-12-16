var sinon = require('sinon'),
    User = require('../lib/models/user'),
    UserService = require('../lib/services/user')(User),
    UserController = require('../lib/controllers/user'),
    UserFake = require('./support/user'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/user', function () {

  describe('.getUsers(req, res)', function () {

    it('Users should be gotten', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserController(UserServiceStub);
      
      user.getUsers(req, res, next);

      UserServiceStub.findAll.called.should.be.true;

    }));

    it('Response should be rendered', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserController(UserServiceStub);

      this.spy(res, 'render');

      user.getUsers(req, res, next);

      UserServiceStub.findAll.callArgWith(0, null, [new UserFake()]);

      res.render.calledWith('blog/admin/users').should.be.true;

    }));

  });

  describe('.getNewUser(req, res)', function () {

    it('Response should be rendered', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserController(UserServiceStub);

      this.spy(res, 'render');

      user.getNewUser(req, res, next);

      res.render.calledWith('blog/admin/user').should.be.true;

    }));

  });

  describe('.newUser(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserController(UserServiceStub);

      user.newUser(req, res, next);

      UserServiceStub.findByUsername.called.should.be.true;

    }));

    it('Exists the user to save', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserController(UserServiceStub);

      next = this.spy(next);

      user.newUser(req, res, next);

      UserServiceStub.findByUsername.callArgWith(1, null, new UserFake());

      next.called.should.be.true;

    }));

  });


  describe('.getUser(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserController(UserServiceStub);

      user.getUser(req, res, next);

      UserServiceStub.findByUsername.called.should.be.true;

    }));
    
    it('Response should be rendered', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserController(UserServiceStub);

      this.spy(res, 'render');

      user.getUser(req, res, next);

      UserServiceStub.findByUsername.callArgWith(1, null, new UserFake());

      res.render.calledWith('blog/admin/user').should.be.true;

    }));

    it('Response should not be rendered', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserController(UserServiceStub);

      next = this.spy(next);

      user.getUser(req, res, next);

      UserServiceStub.findByUsername.callArgWith(1, new Error(), null);

      next.called.should.be.true;
      
    }));

  });

  describe('.updateUser(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserController(UserServiceStub);

      // fake request body form
      req.body.username = 'test';

      user.updateUser(req, res, next);

      UserServiceStub.findByUsername.called.should.be.true;

    }));

  });

});
