/* jshint expr: true */
'use strict';

var sinon = require('sinon');

describe('controllers/rss', function () {

  var RssController = require('../../../lib/controllers/rss');
  var rssController;
  var res = {
    set: function () {},
    send: function () {}
  };
  var req = {
    params: {
      slug: 'irrelevantSlug'
    }
  };
  var next = function () {};

  var RssService = function () {};
  RssService.prototype.list = function () {};

  var sandbox;
  var rssServiceStub;
  var article = {
    title: 'irrelevantTitle',
    author: 'irrelevantAuthor',
    slug: 'irrelevantSlug',
    category: 'irrelevantCategory',
    abstract: 'irrelevantAbstract',
    content: 'irrelevantContent',
    tags: 'irrelevantTag1,irrelevantTag2',
    categories: ['irrelevantCategory']
  };

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    res.set = sandbox.spy(res, 'set');
    res.send = sandbox.spy(res, 'send');
    next = sandbox.spy(next);

    rssServiceStub = sandbox.stub(new RssService());
    rssController = new RssController(rssServiceStub);
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('.list(req, res, next)', function () {

    it('should use the "list" method of article service', function () {
      rssServiceStub.list.callsArgWith(0, null, [article]);

      rssController.list(req, res, next);

      rssServiceStub.list.called.should.be.true;
    });

    it('should render "blog/blog" view', function () {
      rssServiceStub.list.callsArgWith(0, null, [article]);

      rssController.list(req, res, next);

      res.set.called.should.be.true;
      res.send.called.should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      rssServiceStub.list.callsArgWith(0, err, null);

      rssController.list(req, res, next);

      next.calledWith(err).should.be.true;
    });

  });

});
