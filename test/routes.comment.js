var sinon = require('sinon'),
    Article = require('./support/article'),
    Comment = require('../lib/routes/comment'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/comment', function () {

  req.params.slug = '/blog/admin/comment/slug';
  req.params.commentId = 'commentId';
  req.body.comment = 'comment';
  req.body.name = 'Daniel G. Aubert';
  req.body.mail = 'danielgarciaaubert@gmail.com';

  describe('.newComment(req, res, next)', function () {

    it('Comment should be created', sinon.test(function () {

      var comment = new Comment(Article.ok());

      this.spy(res, 'redirect');

      comment.newComment(req, res, next);

      res.redirect.calledWith('/blog/' + req.params.slug + '#lastCommnent').should.be.true;
      
    }));

    it('Comment should not be created', sinon.test(function () {

      var comment = new Comment(Article.ko());
      
      next = this.spy(next);

      comment.newComment(req, res, next);

      next.called.should.be.true;

    }));

  });

  describe('.getComments(req, res, next)', function () {

    it('Comments should be gotten', sinon.test(function () {

      var comment = new Comment(Article.ok());

      this.spy(Article, 'findOne');
      this.spy(Article, 'exec');

      comment.getComments(req, res, next);

      Article.findOne.called.should.be.true;
      Article.exec.called.should.be.true;

    }));

    it('Comments views should be rendered', sinon.test(function () {

      var comment = new Comment(Article.ok());

      this.spy(res, 'render');

      comment.getComments(req, res, next);

      res.render.calledWith('blog/admin/comments').should.be.true;

    }));

  });

  describe('.deleteComment(req, res, next)', function () {

    it('Comment should be found', sinon.test(function () {

      var comment = new Comment(Article.ok());

      this.spy(Article, 'findOne');
      this.spy(Article, 'exec');

      comment.deleteComment(req, res, next);

      Article.findOne.called.should.be.true;
      Article.exec.called.should.be.true;

    }));

    it('Comment should be deleted', sinon.test(function () {

      var comment = new Comment(Article.ok());

      this.spy(res, 'redirect');

      comment.deleteComment(req, res, next);

      res.redirect.calledWith('/blog/admin/articles/' + req.params.slug + '/comments/').should.be.true;

    }));

  });

});
