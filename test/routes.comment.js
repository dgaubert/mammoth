var sinon = require('sinon'),
    Article = require('./support/article'),
    ArticleService = require('../lib/services/article-service'),
    CommentRouter = require('../lib/routes/comment'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/comment', function () {
  var ArticleServiceStub = sinon.stub(ArticleService),
      comment = new CommentRouter(ArticleServiceStub);

  req.params.slug = '/blog/admin/comment/slug';
  req.params.commentId = 'commentId';

  describe('.getComments(req, res, next)', function () {

    it('Comments should be gotten', sinon.test(function () {

      comment.getComments(req, res, next);

      ArticleServiceStub.findBySlug.called.should.be.true;

    }));

    it('Comments views should be rendered', sinon.test(function () {

      this.spy(res, 'render');

      comment.getComments(req, res, next);

      ArticleService.findBySlug.callArgWith(1, null, new Article());

      res.render.calledWith('blog/admin/comments').should.be.true;

    }));

  });

  describe('.deleteComment(req, res, next)', function () {

    it('Comment should be found', sinon.test(function () {

      comment.deleteComment(req, res, next);

      ArticleService.findBySlug.called.should.be.true;

    }));

    it('Comment should be deleted', sinon.test(function () {

      this.spy(res, 'redirect');

      comment.deleteComment(req, res, next);

      ArticleService.findBySlug.callArgWith(1, null, new Article());

      res.redirect.called.should.be.true;

    }));

  });

});
