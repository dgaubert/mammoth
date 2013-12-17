var sinon = require('sinon'),
    Picture = require('../lib/models/picture'),
    PictureService = require('../lib/services/picture')(Picture),
    PictureController = require('../lib/controllers/picture'),
    PictureFake = require('./support/picture'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/article', function () {

  describe('.getPicture(req, res, next)', function () {

    it('Picture should be gotten', sinon.test(function () {
      var PictureServiceStub = this.stub(PictureService),
          picture = new PictureController(PictureServiceStub);

      picture.getPicture(req, res, next);

      PictureServiceStub.read.called.should.be.true;

    }));

    it('Picture should be returned', sinon.test(function () {
      var PictureServiceStub = this.stub(PictureService),
          picture = new PictureController(PictureServiceStub);

      this.spy(res, 'send');

      picture.getPicture(req, res, next);

      PictureServiceStub.read.callArgWith(1, null, [new PictureFake()]);

      res.send.called.should.be.true;

    }));

    it('Response should not be sended', sinon.test(function () {
      var PictureServiceStub = this.stub(PictureService),
          picture = new PictureController(PictureServiceStub);

      next = this.spy(next);

      picture.getPicture(req, res, next);

      PictureServiceStub.read.callArgWith(1, new Error(), null);

      next.called.should.be.true;

    }));

  });

  describe('.newPicture(req, res, next)', function () {

    it('Picture should be saved', sinon.test(function () {
      var PictureServiceStub = this.stub(PictureService),
          picture = new PictureController(PictureServiceStub);

      this.spy(res, 'redirect');

      picture.newPicture(req, res, next);

      PictureServiceStub.save.callArgWith(3, null);

      res.redirect.called.should.be.true;

    }));

    it('Response should not be sended', sinon.test(function () {
      var PictureServiceStub = this.stub(PictureService),
          picture = new PictureController(PictureServiceStub);

      next = this.spy(next);

      picture.newPicture(req, res, next);

      PictureServiceStub.save.callArgWith(3, new Error());

      next.called.should.be.true;

    }));

  });

  describe('.deletePicture(req, res, next)', function () {

    it('Picture should be removed', sinon.test(function () {
      var PictureServiceStub = this.stub(PictureService),
          picture = new PictureController(PictureServiceStub);

      this.spy(res, 'redirect');

      picture.deletePicture(req, res, next);

      PictureServiceStub.remove.callArgWith(1, null);

      res.redirect.called.should.be.true;

    }));

    it('Response should not be removed', sinon.test(function () {
      var PictureServiceStub = this.stub(PictureService),
          picture = new PictureController(PictureServiceStub);

      next = this.spy(next);

      picture.deletePicture(req, res, next);

      PictureServiceStub.remove.callArgWith(1, new Error());

      next.called.should.be.true;

    }));

  });

});