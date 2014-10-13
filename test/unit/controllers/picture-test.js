'use strict';

var sinon = require('sinon');

describe('controllers/picture', function () {

  var PictureController = require('../../../lib/controllers/picture');
  var pictureController;
  var res = {
    render: function () {},
    redirect: function () {},
    send: function () {}
  };
  var req = {
    body: {
      author: 'irrelevantAuthor',
      created: 'irrelevantCreated',
      picture: 'irrelevantPicture',
      mail: 'irrelevantMail@mail.com',
    },
    params: {
      slug: 'irrelevantSlug'
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

    it('should response with 200', function () {
      pictureServiceStub.create.callsArgWith(3, null, picture);

      pictureController.create(req, res, next);

      res.send.calledWith(200).should.be.true;
    });

    it('when something went wrong it should should response with 500', function () {
      var err = new Error();

      pictureServiceStub.create.callsArgWith(3, err, null);

      pictureController.create(req, res, next);

      res.send.calledWith(500).should.be.true;
    });

  });

  describe('.list(req, res, next)', function () {

    it('should use the "list" method of picture service', function () {
      pictureServiceStub.list.callsArgWith(1, null, [picture]);

      pictureController.list(req, res, next);

      pictureServiceStub.list.called.should.be.true;
    });

    it('should render "blog/admin/pictures" view', function () {
      pictureServiceStub.list.callsArgWith(1, null, [picture]);

      pictureController.list(req, res, next);

      res.render.calledWith('blog/admin/pictures').should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      pictureServiceStub.list.callsArgWith(1, err, null);

      pictureController.list(req, res, next);

      next.calledWith(err).should.be.true;
    });

  });

  describe('.remove(req, res, next)', function () {

    it('should delegate to picture\'s service', function () {
      pictureServiceStub.remove.callsArgWith(2, null, picture);

      pictureController.remove(req, res, next);

      pictureServiceStub.remove.called.should.be.true;
    });

    it('should redirect to removed picture', function () {
      pictureServiceStub.remove.callsArgWith(2, null, article);

      pictureController.remove(req, res, next);

      res.redirect.calledWith('/blog/admin/articles/' + req.params.slug + '/pictures/').should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      pictureServiceStub.remove.callsArgWith(2, err, null);

      pictureController.remove(req, res, next);

      next.called.should.equal(true);
    });

  });

});
