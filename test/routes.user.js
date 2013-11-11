var support = require('./support'),
    sinon = require('sinon'),
    User = require('../lib/routes/user')
    Model = support.Model,
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/user', function () {

  // Set model
  Model.setModel(support.user);

  describe('.getUsers(req, res)', function () {

    it('Users should be gotten', sinon.test(function () {

      var user = new User(Model.ok());

      this.spy(Model, 'find');
      this.spy(Model, 'exec');

      user.getUsers(req, res, next);

      Model.find.called.should.be.true;
      Model.exec.called.should.be.true;

    }));

    it('Response should be rendered', sinon.test(function () {

      var user = new User(Model.ok());
      
      this.spy(res, 'render');

      user.getUsers(req, res, next);

      res.render.calledWith('blog/admin/users').should.be.true;

    }));

  });

  describe('.getNewUser(req, res)', function () {

    it('Response should be rendered', sinon.test(function () {

      var user = new User(Model.ok());

      this.spy(res, 'render');

      user.getNewUser(req, res, next);

      res.render.calledWith('blog/admin/user').should.be.true;

    }));

  });

  describe('.newUser(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {

      var user = new User(Model.ok());

      this.spy(Model, 'exec');

      user.newUser(req, res, next);

      Model.exec.called.should.be.true;

    }));

    it('Exists the user to save', sinon.test(function () {

      var user = new User(Model.ok());

      next = this.spy(next);

      user.newUser(req, res, next);

      next.called.should.be.true;

    }));

  });


  describe('.getUser(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {

      var user = new User(Model.ok());

      this.spy(Model, 'exec');

      user.getUser(req, res, next);

      Model.exec.called.should.be.true;

    }));
    
    it('Response should be rendered', sinon.test(function () {

      var user = new User(Model.ok());

      this.spy(res, 'render');

      user.getUser(req, res, next);

      res.render.calledWith('blog/admin/user').should.be.true;

    }));

    it('Response should not be rendered', sinon.test(function () {

      var user = new User(Model.ko());

      next = this.spy(next);

      user.getUser(req, res, next);

      next.called.should.be.true;
      
    }));

  });

  describe('.updateUser(req, res, next)', function () {

    it('User should be gotten', sinon.test(function () {

      var user = new User(Model.ok());

      this.spy(Model, 'exec');

      // fake request body form
      req.body.username = 'test';

      user.updateUser(req, res, next);

      Model.exec.called.should.be.true;

    }));

  });  

});