var support = require('./support'),
    sinon = require('sinon'),
    Login = require('../lib/routes/login');

describe('routes/login', function () {
  var UserModel = support.UserModel,
      login = new Login(UserModel),
      UserModelKO = support.UserModelKO,
      loginKO = new Login(UserModelKO),
      UserModelEmpty = support.UserModelEmpty,
      loginEmpty = new Login(UserModelEmpty),
      req = support.req,
      res = support.res,
      next = support.next;

  describe('.checkUser', function () {

    it('User should be found', function () {
      var UserModelMock = sinon.mock(UserModel);
      UserModelMock.expects('find').once();

      login.checkUser(req, res, next);

      UserModelMock.verify();
    });

    // TODO: something is wrong to test pwd
    it.skip('Login OK, regenerate session', function () {
      req.body.username = 'dgaubert';
      req.body.password = 'mammoth';
      req.session.regenerate = sinon.spy();
      res.redirect = sinon.spy();

      login.checkUser(req, res, next);

      req.session.regenerate.called.should.be.true;
      res.redirect.called.should.be.false;
      req.session.regenerate.reset();
      res.redirect.reset();
    });

    // TODO: something is wrong to test pwd
    it.skip('Wrong password, redirect', function () {
      req.body.username = 'dgaubert';
      req.body.password = 'wrong';
      req.session.regenerate = sinon.spy();
      res.redirect = sinon.spy();

      login.checkUser(req, res, next);

      req.session.regenerate.called.should.be.false;
      res.redirect.called.should.be.true;
      req.session.regenerate.reset();
      res.redirect.reset();
    });


    it('Wrong user, redirect', function () {
      req.body.username = 'dgaubert';
      req.body.password = 'mammoth';
      req.session.regenerate = sinon.spy();
      res.redirect = sinon.spy();

      loginEmpty.checkUser(req, res, next);

      req.session.regenerate.called.should.be.false;
      res.redirect.called.should.be.true;
      req.session.regenerate.reset();
      res.redirect.reset();
    });

    it('Error in DB', function () {
      req.body.username = 'dgaubert';
      req.body.password = 'mammoth';
      next = sinon.spy();

      loginKO.checkUser(req, res, next);

      next.called.should.be.true;
      next.reset();
    });     

  });

  describe('.logout', function () {

    it('Destroy sesion', function () {
      req.session.destroy = sinon.spy();

      login.logout(req, res);

      req.session.destroy.called.should.be.true;
    });

  });

  describe('.getLogin', function () {

    it('Get view to login', function () {
      res.render = sinon.spy();

      login.getLogin(req, res);

      res.render.calledWith('blog/admin/login').should.be.true;
    });

  });  

});
