var support = require('./support'),
    sinon = require('sinon'),
    Comment = require('../lib/routes/comment');

describe('routes/comment', function () {
  var ArticleModel = support.ArticleModel,
      ArticleModelKO = support.ArticleModelKO,
      ArticleModelEmpty = support.ArticleModelEmpty,
      comment = new Comment(ArticleModel),
      commentKO = new Comment(ArticleModelKO),
      commentEmpty = new Comment(ArticleModelEmpty),
      req = support.req,
      res = support.res,
      next = support.next;

describe('.newComment(req, res, next)', function () {

    req.params.slug = '/blog/admin/comment/slug';
    req.params.commentId = 'commentId';
    req.body.comment = 'comment';
    req.body.name = 'Daniel G. Aubert';
    req.body.mail = 'danielgarciaaubert@gmail.com';


    it('Comment should check if the articles exist', function () {
      var ArticleModelMock = sinon.mock(ArticleModel);
      ArticleModelMock.expects('findOne').once();

      comment.getComments(req, res, next);

      ArticleModelMock.verify();
    });

    it('Comment should be created', function () {
      res.redirect = sinon.spy();

      comment.newComment(req, res, next);

      res.redirect.calledWith('/blog/' + req.params.slug + '#lastCommnent').should.be.true;
      res.redirect.reset();
    });

    it('Comment should not be created', function () {
      next = sinon.spy();

      commentKO.newComment(req, res, next);

      next.called.should.be.true;
      next.reset();
    });

  });      

  describe('.getComments(req, res, next)', function () {

    it('Comments should be gotten', function () {
      var ArticleModelMock = sinon.mock(ArticleModel);
      ArticleModelMock.expects('findOne').once();

      comment.getComments(req, res, next);

      ArticleModelMock.verify();
    });

    it('Comments views should be rendered', function () {
      res.render = sinon.spy();

      comment.getComments(req, res, next);

      res.render.calledWith('blog/admin/comments').should.be.true;
      res.render.reset();
    });

  });

  describe('.deleteComment(req, res, next)', function () {

    it('Comment should be found', function () {
      var ArticleModelMock = sinon.mock(ArticleModel);
      ArticleModelMock.expects('findOne').once();

      comment.deleteComment(req, res, next);

      ArticleModelMock.verify();
    });

    it('Comment should be deleted', function () {
      res.redirect = sinon.spy();

      comment.deleteComment(req, res, next);

      res.redirect.calledWith('/blog/admin/articles/' + req.params.slug + '/comments/').should.be.true;
      res.redirect.reset();
    });

  });  

});