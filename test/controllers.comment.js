var sinon = require('sinon'),
    Article = require('../lib/models/article'),
    ArticleService = require('../lib/services/article')(Article),
    CommentController = require('../lib/controllers/comment'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/comment', function () {

  req.params.slug = '/blog/admin/comment/slug';
  req.params.commentId = 'commentId';

  describe('.getComments(req, res, next)', function () {

    it('Comments should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          comment = new CommentController(ArticleServiceStub);

      comment.getComments(req, res, next);

      ArticleServiceStub.findBySlug.called.should.be.true;

    }));

    it('Comments views should be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          comment = new CommentController(ArticleServiceStub);

      this.spy(res, 'render');

      comment.getComments(req, res, next);

      ArticleService.findBySlug.callArgWith(1, null, new Article());

      res.render.calledWith('blog/admin/comments').should.be.true;

    }));

  });

  describe('.deleteComment(req, res, next)', function () {

    it('Comment should be found', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          comment = new CommentController(ArticleServiceStub);

      comment.deleteComment(req, res, next);

      ArticleService.findBySlug.called.should.be.true;

    }));

    it('Comment should be deleted', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          comment = new CommentController(ArticleServiceStub);

      this.spy(res, 'redirect');

      comment.deleteComment(req, res, next);

      ArticleService.findBySlug.callArgWith(1, null, new Article());

      res.redirect.called.should.be.true;

    }));

  });

});
