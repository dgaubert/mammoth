var support = require('./support'),
    sinon = require('sinon'),
    Comment = require('../lib/routes/comment'),
    ArticleModel = support.ArticleModel,
    ArticleModelKO = support.ArticleModelKO,
    ArticleModelEmpty = support.ArticleModelEmpty,
    comment = new Comment(ArticleModel),
    commentKO = new Comment(ArticleModelKO),
    commentEmpty = new Comment(ArticleModelEmpty),
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

      this.spy(res, 'redirect');

      comment.newComment(req, res, next);

      res.redirect.calledWith('/blog/' + req.params.slug + '#lastCommnent').should.be.true;
      
    }));

    it('Comment should not be created', sinon.test(function () {
      
      next = this.spy(next);

      commentKO.newComment(req, res, next);

      next.called.should.be.true;

    }));

  });      

  describe('.getComments(req, res, next)', function () {

    it('Comments should be gotten', sinon.test(function () {

      this.spy(ArticleModel, 'findOne');
      this.spy(ArticleModel, 'exec');

      comment.getComments(req, res, next);

      ArticleModel.findOne.called.should.be.true;
      ArticleModel.exec.called.should.be.true;

    }));

    it('Comments views should be rendered', sinon.test(function () {

      this.spy(res, 'render');

      comment.getComments(req, res, next);

      res.render.calledWith('blog/admin/comments').should.be.true;

    }));

  });

  describe('.deleteComment(req, res, next)', function () {

    it('Comment should be found', sinon.test(function () {

      this.spy(ArticleModel, 'findOne');
      this.spy(ArticleModel, 'exec');

      comment.deleteComment(req, res, next);

      ArticleModel.findOne.called.should.be.true;
      ArticleModel.exec.called.should.be.true;

    }));

    it('Comment should be deleted', sinon.test(function () {

      this.spy(res, 'redirect');

      comment.deleteComment(req, res, next);

      res.redirect.calledWith('/blog/admin/articles/' + req.params.slug + '/comments/').should.be.true;

    }));

  }); 

});
