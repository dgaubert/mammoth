'use strict';
var sinon = require('sinon');

describe('controllers/home', function () {

  var HomeController = require('../../../lib/controllers/home');
  var homeController;
  var res = {
    render: function () {},
    redirect: function () {}
  };
  var req = {};
  var next = function () {};

  var HomeService = function () {};
  HomeService.prototype.show = function () {};

  var sandbox;
  var homeServiceStub;
  var home = {
    articles: [
      {
        title: 'irrelevantTitle',
        author: 'irrelevantAuthor',
        slug: 'irrelevantSlug',
        category: 'irrelevantCategory',
        abstract: 'irrelevantAbstract',
        content: 'irrelevantContent',
        tags: 'irrelevantTag1,irrelevantTag2'
      }
    ],
    categories: ['categories']
  };

  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    res.render = sandbox.spy(res, 'render');
    next = sandbox.spy(next);

    homeServiceStub = sandbox.stub(new HomeService()),
    homeController  = new HomeController(homeServiceStub);
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('.show(req, res, next)', function () {

    it('should use the "home" method of home service', function () {
      homeServiceStub.show.callsArgWith(0, null, home);

      homeController.show(req, res, next);

      homeServiceStub.show.called.should.be.true;
    });

    it('should render "home" view', function () {
      homeServiceStub.show.callsArgWith(0, null, home);

      homeController.show(req, res, next);

      res.render.calledWith('home').should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      homeServiceStub.show.callsArgWith(0, err, null);

      homeController.show(req, res, next);

      next.calledWith(err).should.be.true;
    });

  });

});
