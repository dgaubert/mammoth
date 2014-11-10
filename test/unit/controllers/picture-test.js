/* jshint expr: true */
'use strict';

var sinon = require('sinon');

describe('controllers/picture', function () {

  var PictureController = require('../../../lib/controllers/picture');
  var pictureController;
  var res = {
    set: function () {},
    redirect: function () {},
    send: function () {},
  };
  var req = {
    params: {
      slug: ['irrelevantSlug'],
      pictureName: ['irrelevantPictureName']
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
  var picture = 0; // bytes

  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    res.set = sandbox.spy(res, 'set');
    res.redirect = sandbox.spy(res, 'redirect');
    res.send = sandbox.spy(res, 'send');
    next = sandbox.spy(next);

    pictureServiceStub = sandbox.stub(new PictureService()),
    pictureController  = new PictureController(pictureServiceStub);
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('.retrieve(req, res, next)', function () {

    it('should delegate to picture service', function () {
      pictureServiceStub.retrieve.callsArgWith(1, null, picture);

      pictureController.retrieve(req, res, next);

      pictureServiceStub.retrieve.called.should.be.true;
    });

    it('should response with content-type "image/png"', function () {
      pictureServiceStub.retrieve.callsArgWith(1, null, picture);

      pictureController.retrieve(req, res, next);

      res.set.calledWithExactly('Content-Type', 'image/png').should.be.true;
      res.send.called.should.be.true;
    });

    it('when something went wrong it should should pass to the next with error', function () {
      var err = new Error();

      pictureServiceStub.retrieve.callsArgWith(1, err, null);

      pictureController.retrieve(req, res, next);

      next.calledWith(err).should.be.true;
    });

  });

  describe('.create(req, res, next)', function () {

    it('should use the "create" method of picture service', function () {
      pictureServiceStub.create.callsArgWith(3, null);

      pictureController.create(req, res, next);

      pictureServiceStub.create.called.should.be.true;
    });

    it('should redirect "blog/admin/articles" view', function () {
      pictureServiceStub.create.callsArgWith(3, null);

      pictureController.create(req, res, next);

      res.redirect.calledWith('/blog/admin/articles/' + req.params.slug[0]).should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      pictureServiceStub.create.callsArgWith(3, err);

      pictureController.create(req, res, next);

      next.calledWith(err).should.be.true;
    });

  });

  describe('.remove(req, res, next)', function () {

    it('should delegate to picture\'s service', function () {
      pictureServiceStub.remove.callsArgWith(1, null);

      pictureController.remove(req, res, next);

      pictureServiceStub.remove.called.should.be.true;
    });

    it('should redirect to article of the picture', function () {
      pictureServiceStub.remove.callsArgWith(1, null);

      pictureController.remove(req, res, next);

      res.redirect.calledWith('/blog/admin/articles/' + req.params.slug).should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      pictureServiceStub.remove.callsArgWith(1, err);

      pictureController.remove(req, res, next);

      next.calledWith(err).should.equal(true);
    });

  });

});
