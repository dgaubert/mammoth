var sinon = require('sinon'),
    User = require('./support/user'),
    UserService = require('../lib/services/user-service'),
    UserRouter = require('../lib/routes/user')
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/user', function () {

  describe('.getUsers(req, res)', function () {

    it('Users should be gotten', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserRouter(UserServiceStub);
      
      user.getUsers(req, res, next);

      UserServiceStub.findAll.called.should.be.true;

    }));

    it('Response should be rendered', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserRouter(UserServiceStub);

      this.spy(res, 'render');

      user.getUsers(req, res, next);

      UserServiceStub.findAll.callArgWith(0, null, [new User()]);

      res.render.calledWith('blog/admin/users').should.be.true;

    }));

  });

  describe('.getNewUser(req, res)', function () {

    it('Response should be rendered', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserRouter(UserServiceStub);

      this.spy(res, 'render');

      user.getNewUser(req, res, next);

      res.render.calledWith('blog/admin/user').should.be.true;

    }));

  });

  describe('.newUser(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserRouter(UserServiceStub);

      user.newUser(req, res, next);

      UserServiceStub.findByUsername.called.should.be.true;

    }));

    it('Exists the user to save', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserRouter(UserServiceStub);

      next = this.spy(next);

      user.newUser(req, res, next);

      UserServiceStub.findByUsername.callArgWith(1, null, new User());

      next.called.should.be.true;

    }));

  });


  describe('.getUser(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserRouter(UserServiceStub);

      user.getUser(req, res, next);

      UserServiceStub.findByUsername.called.should.be.true;

    }));
    
    it('Response should be rendered', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserRouter(UserServiceStub);

      this.spy(res, 'render');

      user.getUser(req, res, next);

      UserServiceStub.findByUsername.callArgWith(1, null, new User());

      res.render.calledWith('blog/admin/user').should.be.true;

    }));

    it('Response should not be rendered', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserRouter(UserServiceStub);

      next = this.spy(next);

      user.getUser(req, res, next);

      UserServiceStub.findByUsername.callArgWith(1, new Error(), null);

      next.called.should.be.true;
      
    }));

  });

  describe('.updateUser(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {
      var UserServiceStub = this.stub(UserService),
          user = new UserRouter(UserServiceStub);

      // fake request body form
      req.body.username = 'test';

      user.updateUser(req, res, next);

      UserServiceStub.findByUsername.called.should.be.true;

    }));

  });

});
