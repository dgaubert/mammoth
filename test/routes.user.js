var sinon = require('sinon'),
    UserModel = require('./support/user'),
    User = require('../lib/routes/user')
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/user', function () {

  describe('.getUsers(req, res)', function () {

    it('Users should be gotten', sinon.test(function () {

      var user = new User(UserModel.ok());

      this.spy(UserModel, 'find');
      this.spy(UserModel, 'exec');

      user.getUsers(req, res, next);

      UserModel.find.called.should.be.true;
      UserModel.exec.called.should.be.true;

    }));

    it('Response should be rendered', sinon.test(function () {

      var user = new User(UserModel.ok());
      
      this.spy(res, 'render');

      user.getUsers(req, res, next);

      res.render.calledWith('blog/admin/users').should.be.true;

    }));

  });

  describe('.getNewUser(req, res)', function () {

    it('Response should be rendered', sinon.test(function () {

      var user = new User(UserModel.ok());

      this.spy(res, 'render');

      user.getNewUser(req, res, next);

      res.render.calledWith('blog/admin/user').should.be.true;

    }));

  });

  describe('.newUser(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {

      var user = new User(UserModel.ok());

      this.spy(UserModel, 'exec');

      user.newUser(req, res, next);

      UserModel.exec.called.should.be.true;

    }));

    it('Exists the user to save', sinon.test(function () {

      var user = new User(UserModel.ok());

      next = this.spy(next);

      user.newUser(req, res, next);

      next.called.should.be.true;

    }));

  });


  describe('.getUser(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {

      var user = new User(UserModel.ok());

      this.spy(UserModel, 'exec');

      user.getUser(req, res, next);

      UserModel.exec.called.should.be.true;

    }));
    
    it('Response should be rendered', sinon.test(function () {

      var user = new User(UserModel.ok());

      this.spy(res, 'render');

      user.getUser(req, res, next);

      res.render.calledWith('blog/admin/user').should.be.true;

    }));

    it('Response should not be rendered', sinon.test(function () {

      var user = new User(UserModel.ko());

      next = this.spy(next);

      user.getUser(req, res, next);

      next.called.should.be.true;
      
    }));

  });

  describe('.updateUser(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {

      var user = new User(UserModel.ok());

      this.spy(UserModel, 'exec');

      // fake request body form
      req.body.username = 'test';

      user.updateUser(req, res, next);

      UserModel.exec.called.should.be.true;

    }));

  });  

});