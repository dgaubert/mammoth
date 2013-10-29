var support = require('./support'),
    sinon = require('sinon'),
    Blog = require('../lib/routes/blog');

describe('routes/login', function () {
  var ArticleModel = support.ArticleModel,
      blog = new Blog(ArticleModel),
      ArticleModelKO = support.ArticleModelKO,
      blogKO = new Blog(ArticleModelKO),
      req = support.req,
      res = support.res,
      next = support.next;

  describe('.getSummary', function () {
    req.params.page = 0;
    req.params.category = 'category';
    req.params.tag = ['tag'];

    it('Summary should be gotten', function () {
      var ArticleModelMock = sinon.mock(ArticleModel);
      ArticleModelMock.expects('findRange').once();
      ArticleModelMock.expects('count').once();

      blog.getSummary(req, res, next);

      ArticleModelMock.verify();
    });

    it('Blog view shouold be rendered', function () {
      res.render = sinon.spy();

      blog.getSummary(req, res, next);

      res.render.calledWith('blog/blog').should.be.true;
      res.render.reset();
    });

    it('Error in Model', function () {
      next = sinon.spy();

      blogKO.getSummary(req, res, next);

      next.called.should.be.true;
      next.reset();
    });    

  });

  describe('.getArticle', function () {

    it('Article should be gotten', function () {
      var ArticleModelMock = sinon.mock(ArticleModel);
      ArticleModelMock.expects('find').once();
      ArticleModelMock.expects('categoriesCount').once();

      blog.getArticle(req, res, next);

      ArticleModelMock.verify();
    });

    it('Render de article view', function () {
      req.params.slug = '/blog/slug',
      res.render = sinon.spy();

      blog.getArticle(req, res, next);

      res.render.calledWith('blog/article').should.be.true;
      res.render.reset();
    });

    it('Error in Model', function () {
      next = sinon.spy();

      blogKO.getArticle(req, res, next);

      next.called.should.be.true;
      next.reset();
    });  

  });  

});