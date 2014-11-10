/* jshint expr: true */
'use strict';

var sinon = require('sinon');

describe('controllers/captcha', function () {

  var PictureController = require('../../../lib/controllers/captcha');
  var captchaController;
  var res = {
    render: function () {},
    redirect: function () {},
    send: function () {},
    set: function () {}
  };
  var req = {
    body: {
      value: 'irrelevantValue'
    },
    params: {
      slug: ['irrelevantSlug']
    },
    files: {
      captcha: {
        path: 'irrelevantPath',
        name: 'irrelevantName'
      }
    }
  };
  var next = function () {};

  var CaptchaService = function () {};

  CaptchaService.prototype.retrieve = function () {};
  CaptchaService.prototype.create = function () {};
  CaptchaService.prototype.remove = function () {};

  var sandbox;
  var captchaServiceStub;
  var captcha = req.body;
  var article = { slug: 'irrelevantSlug' };

  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    res.render = sandbox.spy(res, 'render');
    res.redirect = sandbox.spy(res, 'redirect');
    res.send = sandbox.spy(res, 'send');
    res.set = sandbox.spy(res, 'set');
    next = sandbox.spy(next);

    captchaServiceStub = sandbox.stub(new CaptchaService());
    captchaController  = new PictureController(captchaServiceStub);
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('.create(req, res)', function () {

    it('should delegate to the service the captcha\'s creation', function () {
      captchaServiceStub.create.callsArgWith(2, null, captcha);

      captchaController.create(req, res, next);

      captchaServiceStub.create.called.should.be.true;
    });

    it('should response with redirect', function () {
      captchaServiceStub.create.callsArgWith(2, null, captcha);

      captchaController.create(req, res, next);

      res.redirect.calledWith('/blog/admin/captcha').should.be.true;
    });

    it('when something went wrong it should pass to the next with error', function () {
      var err = new Error();

      captchaServiceStub.create.callsArgWith(2, err, null);

      captchaController.create(req, res, next);

      next.called.should.equal(true);
    });

  });

  describe('.retrieve(req, res, next)', function () {

    it('should use the "retrieve" method of captcha service', function () {
      captchaServiceStub.retrieve.callsArgWith(1, null, [captcha]);

      captchaController.retrieve(req, res, next);

      captchaServiceStub.retrieve.called.should.be.true;
    });

    it('should render "blog/admin/captchas" view', function () {
      captchaServiceStub.retrieve.callsArgWith(1, null, [captcha]);

      captchaController.retrieve(req, res, next);

      res.set.called.should.be.true;
      res.send.called.should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      captchaServiceStub.retrieve.callsArgWith(1, err, null);

      captchaController.retrieve(req, res, next);

      next.calledWith(err).should.be.true;
    });

  });

  describe('.remove(req, res, next)', function () {

    it('should delegate to captcha\'s service', function () {
      captchaServiceStub.remove.callsArgWith(1, null, captcha);

      captchaController.remove(req, res, next);

      captchaServiceStub.remove.called.should.be.true;
    });

    it('should redirect to removed captcha', function () {
      captchaServiceStub.remove.callsArgWith(1, null, article);

      captchaController.remove(req, res, next);

      res.redirect.calledWith('/blog/admin/captcha').should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      captchaServiceStub.remove.callsArgWith(1, err, null);

      captchaController.remove(req, res, next);

      next.called.should.equal(true);
    });

  });

});
