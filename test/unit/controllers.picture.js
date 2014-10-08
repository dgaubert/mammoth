'use strict';

var sinon = require('sinon'),
    Picture = require('../../lib/models/picture'),
    PictureService = require('../../lib/services/picture')(Picture),
    PictureController = require('../../lib/controllers/picture'),
    PictureFake = require('../fixtures/picture'),
    support = require('../fixtures/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/article', function () {

  describe('.retrieve(req, res, next)', function () {

    it('Picture should be gotten', sinon.test(function () {
      var PictureServiceStub = this.stub(PictureService),
          pictureController = PictureController(PictureServiceStub);

      pictureController.retrieve(req, res, next);

      PictureServiceStub.read.called.should.equal(true);

    }));

    it('Picture should be returned', sinon.test(function () {
      var PictureServiceStub = this.stub(PictureService),
          pictureController = PictureController(PictureServiceStub);

      this.spy(res, 'send');

      pictureController.retrieve(req, res, next);

      PictureServiceStub.read.callArgWith(1, null, [new PictureFake()]);
      res.send.called.should.equal(true);

    }));

    it('Response should not be sended', sinon.test(function () {
      var PictureServiceStub = this.stub(PictureService),
          pictureController = PictureController(PictureServiceStub);

      next = this.spy(next);

      pictureController.retrieve(req, res, next);

      PictureServiceStub.read.callArgWith(1, new Error(), null);

      next.called.should.equal(true);

    }));

  });

  describe('.create(req, res, next)', function () {

    it('Picture should be saved', sinon.test(function () {
      var PictureServiceStub = this.stub(PictureService),
          pictureController = PictureController(PictureServiceStub);

      this.spy(res, 'redirect');

      pictureController.create(req, res, next);

      PictureServiceStub.save.callArgWith(3, null);
      res.redirect.called.should.equal(true);

    }));

    it('Response should not be sended', sinon.test(function () {
      var PictureServiceStub = this.stub(PictureService),
          pictureController = PictureController(PictureServiceStub);

      next = this.spy(next);

      pictureController.create(req, res, next);

      PictureServiceStub.save.callArgWith(3, new Error());
      next.called.should.equal(true);

    }));

  });

  describe('.remove(req, res, next)', function () {

    it('Picture should be removed', sinon.test(function () {
      var PictureServiceStub = this.stub(PictureService),
          pictureController = PictureController(PictureServiceStub);

      this.spy(res, 'redirect');

      pictureController.remove(req, res, next);

      PictureServiceStub.remove.callArgWith(1, null);
      res.redirect.called.should.equal(true);

    }));

    it('Response should not be removed', sinon.test(function () {
      var PictureServiceStub = this.stub(PictureService),
          pictureController = PictureController(PictureServiceStub);

      next = this.spy(next);

      pictureController.remove(req, res, next);

      PictureServiceStub.remove.callArgWith(1, new Error());
      next.called.should.equal(true);

    }));

  });

});
