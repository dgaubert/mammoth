var support = require('./support'),
    sinon = require('sinon'),
    User = require('../lib/routes/user')
    UserModel = support.UserModel,
    user = new User(UserModel),
    UserModelKO = support.UserModelKO,
    userKO = new User(UserModelKO),
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/user', function () {

  describe('.getUsers(req, res)', function () {

    it('Users should be gotten', sinon.test(function () {

      this.spy(UserModel, 'find');
      this.spy(UserModel, 'exec');

      user.getUsers(req, res, next);

      UserModel.find.called.should.be.true;
      UserModel.exec.called.should.be.true;

    }));

    it('Response should be rendered', sinon.test(function () {
      
      this.spy(res, 'render');

      user.getUsers(req, res, next);

      res.render.calledWith('blog/admin/users').should.be.true;

    }));

  });

  describe('.getNewUser(req, res)', function () {

    it('Response should be rendered', sinon.test(function () {

      this.spy(res, 'render');

      user.getNewUser(req, res, next);

      res.render.calledWith('blog/admin/user').should.be.true;

    }));

  });

  describe('.newUser(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {

      this.spy(UserModel, 'exec');

      user.newUser(req, res, next);

      UserModel.exec.called.should.be.true;

    }));

    it('Exists the user to save', sinon.test(function () {

      next = this.spy(next);

      user.newUser(req, res, next);

      next.called.should.be.true;

    }));

  });


  describe('.getUser(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {

      this.spy(UserModel, 'exec');

      user.getUser(req, res, next);

      UserModel.exec.called.should.be.true;

    }));
    
    it('Response should be rendered', sinon.test(function () {

      this.spy(res, 'render');

      user.getUser(req, res, next);

      res.render.calledWith('blog/admin/user').should.be.true;

    }));

    it('Response should not be rendered', sinon.test(function () {

      next = this.spy(next);

      userKO.getUser(req, res, next);

      next.called.should.be.true;
      
    }));

  });

  describe('.updateUser(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {

      this.spy(UserModel, 'exec');

      // fake request body form
      req.body.username = 'test';

      user.updateUser(req, res, next);

      UserModel.exec.called.should.be.true;

    }));

  });  

});