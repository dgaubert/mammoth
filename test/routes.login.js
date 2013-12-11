var sinon = require('sinon'),
    User = require('./support/user'),
    UserService = require('../lib/services/user-service'),
    LoginRouter = require('../lib/routes/login'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/login', function () {
  var UserServiceStub = sinon.stub(UserService),
      login = new LoginRouter(UserServiceStub);

  describe('.checkUser', function () {

    it('User should be found', sinon.test(function () {

      login.checkUser(req, res, next);

      UserServiceStub.findByUsername.called.should.be.true;

    }));

    // TODO: something is wrong to test pwd
    it.skip('Login OK, regenerate session', sinon.test(function () {

      req.body.username = '';
      req.body.password = '';

      this.spy(req.session, 'regenerate');
      this.spy(res, 'redirect');

      login.checkUser(req, res, next);

      UserServiceStub.findByUsername.callArgWith(1, null, new User());

      req.session.regenerate.called.should.be.true;
      res.redirect.called.should.be.false;

    }));

    it.skip('Wrong password, redirect', sinon.test(function () {

      var login = new Login(User.ok());

      req.body.username = 'dgaubert';
      req.body.password = 'wrong';
      
      this.spy(req.session, 'regenerate');
      this.spy(res, 'redirect');

      login.checkUser(req, res, next);

      req.session.regenerate.called.should.be.false;
      res.redirect.called.should.be.true;

    }));

    it('Wrong user, redirect', function () {

      req.body.username = 'dgaubert';
      req.body.password = 'mammoth';

      this.spy(req.session, 'regenerate');
      this.spy(res, 'redirect');

      login.checkUser(req, res, next);

      UserServiceStub.findByUsername.callArgWith(1, null, {});

      req.session.regenerate.called.should.be.false;
      res.redirect.called.should.be.true;

    });

    it('Error in DB', sinon.test(function () {

      req.body.username = 'dgaubert';
      req.body.password = 'mammoth';

      next = this.spy(next);

      login.checkUser(req, res, next);

      UserServiceStub.findByUsername.callArgWith(1, new Error(), null);

      next.called.should.be.true;

    }));

  });

  describe('.logout', function () {

    it('Destroy sesion', sinon.test(function () {

      this.spy(req.session, 'destroy');

      login.logout(req, res);

      req.session.destroy.called.should.be.true;

    }));

  });

  describe('.getLogin', function () {

    it('Get view to login', sinon.test(function () {

      this.spy(res, 'render');

      login.getLogin(req, res);

      res.render.calledWith('blog/admin/login').should.be.true;
    
    }));

  });

});
