/* jslint node:true */
/* global describe: true, it:true*/
'use strict';

var sinon = require('sinon'),
    Picture = require('../lib/models/picture'),
    pictureService = require('../lib/services/picture')(Picture),
    pictureController = require('../lib/controllers/picture'),
    PictureFake = require('./support/picture'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/article', function () {

  describe('.retrieve(req, res, next)', function () {

    it('Picture should be gotten', sinon.test(function () {
      var pictureServiceStub = this.stub(pictureService),
          pictureCntlr = new pictureController(pictureServiceStub);

      pictureCntlr.retrieve(req, res, next);

      pictureServiceStub.read.called.should.equal(true);

    }));

    it('Picture should be returned', sinon.test(function () {
      var pictureServiceStub = this.stub(pictureService),
          pictureCntlr = new pictureController(pictureServiceStub);

      this.spy(res, 'send');

      pictureCntlr.retrieve(req, res, next);

      pictureServiceStub.read.callArgWith(1, null, [new PictureFake()]);
      res.send.called.should.equal(true);

    }));

    it('Response should not be sended', sinon.test(function () {
      var pictureServiceStub = this.stub(pictureService),
          pictureCntlr = new pictureController(pictureServiceStub);

      next = this.spy(next);

      pictureCntlr.retrieve(req, res, next);

      pictureServiceStub.read.callArgWith(1, new Error(), null);

      next.called.should.equal(true);

    }));

  });

  describe('.create(req, res, next)', function () {

    it('Picture should be saved', sinon.test(function () {
      var pictureServiceStub = this.stub(pictureService),
          pictureCntlr = new pictureController(pictureServiceStub);

      this.spy(res, 'redirect');

      pictureCntlr.create(req, res, next);

      pictureServiceStub.save.callArgWith(3, null);
      res.redirect.called.should.equal(true);

    }));

    it('Response should not be sended', sinon.test(function () {
      var pictureServiceStub = this.stub(pictureService),
          pictureCntlr = new pictureController(pictureServiceStub);

      next = this.spy(next);

      pictureCntlr.create(req, res, next);

      pictureServiceStub.save.callArgWith(3, new Error());
      next.called.should.equal(true);

    }));

  });

  describe('.remove(req, res, next)', function () {

    it('Picture should be removed', sinon.test(function () {
      var pictureServiceStub = this.stub(pictureService),
          pictureCntlr = new pictureController(pictureServiceStub);

      this.spy(res, 'redirect');

      pictureCntlr.remove(req, res, next);

      pictureServiceStub.remove.callArgWith(1, null);
      res.redirect.called.should.equal(true);

    }));

    it('Response should not be removed', sinon.test(function () {
      var pictureServiceStub = this.stub(pictureService),
          pictureCntlr = new pictureController(pictureServiceStub);

      next = this.spy(next);

      pictureCntlr.remove(req, res, next);

      pictureServiceStub.remove.callArgWith(1, new Error());
      next.called.should.equal(true);

    }));

  });

});