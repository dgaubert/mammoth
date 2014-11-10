/* jshint expr: true */
'use strict';

var sinon = require('sinon');

describe('controllers/comment', function () {

  var CommentController = require('../../../lib/controllers/comment');
  var commentController;
  var res = {
    render: function () {},
    redirect: function () {},
    send: function () {}
  };
  var req = {
    body: {
      author: 'irrelevantAuthor',
      created: 'irrelevantCreated',
      comment: 'irrelevantComment',
      mail: 'irrelevantMail@mail.com',
    },
    params: {
      slug: 'irrelevantSlug'
    }
  };
  var next = function () {};

  var CommentService = function () {};
  CommentService.prototype.list = function () {};
  CommentService.prototype.create = function () {};
  CommentService.prototype.remove = function () {};

  var sandbox;
  var commentServiceStub;
  var comment = req.body;
  var article = { slug: 'irrelevantSlug' };

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    res.render = sandbox.spy(res, 'render');
    res.redirect = sandbox.spy(res, 'redirect');
    res.send = sandbox.spy(res, 'send');
    next = sandbox.spy(next);

    commentServiceStub = sandbox.stub(new CommentService()),
    commentController  = new CommentController(commentServiceStub);
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('.create(req, res)', function () {

    it('should delegate to the service the comment\'s creation', function () {
      commentServiceStub.create.callsArgWith(3, null, comment);

      commentController.create(req, res, next);

      commentServiceStub.create.called.should.be.true;
    });

    it('should response with 200', function () {
      commentServiceStub.create.callsArgWith(3, null, comment);

      commentController.create(req, res, next);

      res.send.calledWith(200).should.be.true;
    });

    it('when something went wrong it should should response with 500', function () {
      var err = new Error();

      commentServiceStub.create.callsArgWith(3, err, null);

      commentController.create(req, res, next);

      res.send.calledWith(500).should.be.true;
    });

  });

  describe('.list(req, res, next)', function () {

    it('should use the "list" method of comment service', function () {
      commentServiceStub.list.callsArgWith(1, null, [comment]);

      commentController.list(req, res, next);

      commentServiceStub.list.called.should.be.true;
    });

    it('should render "blog/admin/comments" view', function () {
      commentServiceStub.list.callsArgWith(1, null, [comment]);

      commentController.list(req, res, next);

      res.render.calledWith('blog/admin/comments').should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      commentServiceStub.list.callsArgWith(1, err, null);

      commentController.list(req, res, next);

      next.calledWith(err).should.be.true;
    });

  });

  describe('.remove(req, res, next)', function () {

    it('should delegate to comment\'s service', function () {
      commentServiceStub.remove.callsArgWith(2, null, comment);

      commentController.remove(req, res, next);

      commentServiceStub.remove.called.should.be.true;
    });

    it('should redirect to removed comment', function () {
      commentServiceStub.remove.callsArgWith(2, null, article);

      commentController.remove(req, res, next);

      res.redirect.calledWith('/blog/admin/articles/' + req.params.slug + '/comments/').should.be.true;
    });

    it('when something went wrong it should manage the incoming error', function () {
      var err = new Error();

      commentServiceStub.remove.callsArgWith(2, err, null);

      commentController.remove(req, res, next);

      next.called.should.equal(true);
    });

  });

});
