var support = require('./support'),
    sinon = require('sinon'),
    Login = require('../lib/routes/login'),
    Model = support.Model,
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/login', function () {

  // Set model
  Model.setModel(support.article);

  describe('.checkUser', function () {

    it('User should be found', sinon.test(function () {

      var login = new Login(Model.ok());

      this.spy(Model, 'exec');

      login.checkUser(req, res, next);

      Model.exec.called.should.be.true;

    }));

    // TODO: something is wrong to test pwd
    it.skip('Login OK, regenerate session', sinon.test(function () {

      var login = new Login(Model.ok());

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

      var login = new Login(Model.ok());

      req.body.username = 'dgaubert';
      req.body.password = 'wrong';
      
      this.spy(req.session, 'regenerate');
      this.spy(res, 'redirect');

      login.checkUser(req, res, next);

      req.session.regenerate.called.should.be.false;
      res.redirect.called.should.be.true;

    }));


    it('Wrong user, redirect', function () {

      var login = new Login(Model.empty());

      req.body.username = 'dgaubert';
      req.body.password = 'mammoth';

      this.spy(req.session, 'regenerate');
      this.spy(res, 'redirect');

      login.checkUser(req, res, next);

      req.session.regenerate.called.should.be.false;
      res.redirect.called.should.be.true;

    });

    it('Error in DB', sinon.test(function () {

      var login = new Login(Model.ko());

      req.body.username = 'dgaubert';
      req.body.password = 'mammoth';

      next = this.spy(next);

      login.checkUser(req, res, next);

      next.called.should.be.true;

    }));

  });

  describe('.logout', function () {

    it('Destroy sesion', sinon.test(function () {

      var login = new Login(Model.ok());

      this.spy(req.session, 'destroy');

      login.logout(req, res);

      req.session.destroy.called.should.be.true;

    }));

  });

  describe('.getLogin', function () {

    it('Get view to login', sinon.test(function () {

      var login = new Login(Model.ok());

      this.spy(res, 'render');

      login.getLogin(req, res);

      res.render.calledWith('blog/admin/login').should.be.true;
    
    }));

  });  

});
