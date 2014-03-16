var sinon = require('sinon'),
    Article = require('../../lib/models/article'),
    ArticleService = require('../../lib/services/article')(Article),
    CommentController = require('../../lib/controllers/comment'),
    ArticleFake = require('../fixtures/article'),
    support = require('../fixtures/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/comment', function () {

  req.params.slug = '/blog/admin/comment/slug';
  req.params.commentId = 'commentId';

  describe('.list(req, res, next)', function () {

    it('Comments should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          comment = new CommentController(ArticleServiceStub);

      comment.list(req, res, next);

      ArticleServiceStub.findBySlug.called.should.be.true;

    }));

    it('Comments views should be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          comment = new CommentController(ArticleServiceStub);

      this.spy(res, 'render');

      comment.list(req, res, next);

      ArticleService.findBySlug.callArgWith(1, null, new ArticleFake());

      res.render.calledWith('blog/admin/comments').should.be.true;

    }));

  });

  describe('.remove(req, res, next)', function () {

    it('Comment should be found', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          comment = new CommentController(ArticleServiceStub);

      comment.remove(req, res, next);

      ArticleService.findBySlug.called.should.be.true;

    }));

    it('Comment should be deleted', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          comment = new CommentController(ArticleServiceStub);

      this.spy(res, 'redirect');

      comment.remove(req, res, next);

      ArticleService.findBySlug.callArgWith(1, null, new ArticleFake());

      res.redirect.called.should.be.true;

    }));

  });

 describe('.create(req, res, next)', function () {

    req.body.comment = 'comment';
    req.body.name = 'Daniel G. Aubert';
    req.body.mail = 'danielgarciaaubert@gmail.com';

    req.body.challengeId = 1;
    req.body.challengeValue = 'x';

    it('Comment should be created', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          comment = new CommentController(ArticleServiceStub);

      this.spy(res, 'send');

      comment.create(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, null, new ArticleFake());

      res.send.calledWith(200).should.be.true;

    }));

    it('Comment should not be created', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          comment = new CommentController(ArticleServiceStub);

      next = this.spy(next);

      comment.create(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, new Error(), null);

      next.called.should.be.true;

    }));

  });


});
