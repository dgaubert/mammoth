/* jshint expr: true */
'use strict';

var sinon = require('sinon');

describe('controllers/picture', function () {

  var PictureController = require('../../../lib/controllers/picture');
  var pictureController;
  var res = {
    render: function () {},
    redirect: function () {},
    send: function () {},
    set: function () {}
  };
  var req = {
    params: {
      slug: ['irrelevantSlug']
    },
    files: {
      picture: {
        path: 'irrelevantPath',
        name: 'irrelevantName'
      }
    }
  };
  var next = function () {};

  var PictureService = function () {};

  PictureService.prototype.retrieve = function () {};
  PictureService.prototype.create = function () {};
  PictureService.prototype.remove = function () {};

  var sandbox;
  var pictureServiceStub;
  var picture = req.body;
  var article = { slug: 'irrelevantSlug' };

  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    res.render = sandbox.spy(res, 'render');
    res.redirect = sandbox.spy(res, 'redirect');
    res.send = sandbox.spy(res, 'send');
    res.set = sandbox.spy(res, 'set');
    next = sandbox.spy(next);

    pictureServiceStub = sandbox.stub(new PictureService()),
    pictureController  = new PictureController(pictureServiceStub);
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('.create(req, res)', function () {

    it('should delegate to the service the picture\'s creation', function () {
      pictureServiceStub.create.callsArgWith(3, null, picture);

      pictureController.create(req, res, next);

      pictureServiceStub.create.called.should.be.true;
    });

    it('should response with redirect', function () {
      pictureServiceStub.create.callsArgWith(3, null, picture);

      pictureController.create(req, res, next);

      res.redirect.calledWith('/blog/admin/articles/' + req.params.slug[0]).should.be.true;
    });

    it('when something went wrong it should should pass to the next with error', function () {
      var err = new Error();

      pictureServiceStub.create.callsArgWith(3, err, null);

      pictureController.create(req, res, next);

      next.called.should.equal(true);
    });

  });

  describe('.retrieve(req, res, next)', function () {

    it('should use the "retrieve" method of picture service', function () {
      pictureServiceStub.retrieve.callsArgWith(1, null, [picture]);

      pictureController.retrieve(req, res, next);

      pictureServiceStub.retrieve.called.should.be.true;
    });

    it('should render "blog/admin/pictures" view', function () {
      pictureServiceStub.retrieve.callsArgWith(1, null, [picture]);

      pictureController.retrieve(req, res, next);

      res.set.called.should.be.true;
      res.send.called.should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      pictureServiceStub.retrieve.callsArgWith(1, err, null);

      pictureController.retrieve(req, res, next);

      next.calledWith(err).should.be.true;
    });

  });

  describe('.remove(req, res, next)', function () {

    it('should delegate to picture\'s service', function () {
      pictureServiceStub.remove.callsArgWith(1, null, picture);

      pictureController.remove(req, res, next);

      pictureServiceStub.remove.called.should.be.true;
    });

    it('should redirect to removed picture', function () {
      pictureServiceStub.remove.callsArgWith(1, null, article);

      pictureController.remove(req, res, next);

      res.redirect.calledWith('/blog/admin/articles/' + req.params.slug[0]).should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      pictureServiceStub.remove.callsArgWith(1, err, null);

      pictureController.remove(req, res, next);

      next.called.should.equal(true);
    });

  });

});
