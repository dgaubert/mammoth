var support = require('./support'),
    sinon = require('sinon'),
    Login = require('../lib/routes/login'),
    UserModel = support.UserModel,
    login = new Login(UserModel),
    UserModelKO = support.UserModelKO,
    loginKO = new Login(UserModelKO),
    UserModelEmpty = support.UserModelEmpty,
    loginEmpty = new Login(UserModelEmpty),
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/login', function () {

  describe('.checkUser', function () {

    it('User should be found', sinon.test(function () {

      this.spy(UserModel, 'exec');

      login.checkUser(req, res, next);

      UserModel.exec.called.should.be.true;

    }));

    // TODO: something is wrong to test pwd
    it.skip('Login OK, regenerate session', sinon.test(function () {
      req.body.username = 'dgaubert';
      req.body.password = 'mammoth';

      this.spy(req.session, 'regenerate');
      this.spy(res, 'redirect');

      login.checkUser(req, res, next);

      req.session.regenerate.called.should.be.true;
      res.redirect.called.should.be.false;

    }));

    // TODO: something is wrong to test pwd
    it.skip('Wrong password, redirect', sinon.test(function () {
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

      loginEmpty.checkUser(req, res, next);

      req.session.regenerate.called.should.be.false;
      res.redirect.called.should.be.true;

    });

    it('Error in DB', sinon.test(function () {

      req.body.username = 'dgaubert';
      req.body.password = 'mammoth';

      next = this.spy(next);

      loginKO.checkUser(req, res, next);

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
