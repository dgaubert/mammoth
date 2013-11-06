var support = require('./support'),
    sinon = require('sinon'),
    Blog = require('../lib/routes/blog'),
    ArticleModel = support.ArticleModel,
    ArticleModelKO = support.ArticleModelKO,
    ArticleModelEmpty = support.ArticleModelEmpty,
    blog = new Blog(ArticleModel),
    blogKO = new Blog(ArticleModelKO),
    blogEmpty = new Blog(ArticleModelEmpty),
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/login', function () {

  describe('.getSummary', function () {

    req.params.page = 0;
    req.params.category = 'category';
    req.params.tag = ['tag'];

    it('Summary should be gotten', sinon.test(function () {
      
      this.spy(ArticleModel, 'exec');
      this.spy(ArticleModel, 'count');
      
      blog.getSummary(req, res, next);
      
      ArticleModel.exec.called.should.be.true;
      ArticleModel.count.called.should.be.true;

    }));

    it('Blog view should be rendered', sinon.test(function () {
      
      this.spy(res, 'render');
      
      blog.getSummary(req, res, next);
      
      res.render.calledWith('blog/blog').should.be.true;
      
    }));

    it('Error in Model', sinon.test(function () {

      next = this.spy(next);

      blogKO.getSummary(req, res, next);

      next.called.should.be.true;

    }));

  });

  describe('.getArticle', function () {

    it('Article should be gotten', sinon.test(function () {

      this.spy(ArticleModel, 'exec');
      this.spy(ArticleModel, 'categoriesCount');

      blog.getArticle(req, res, next);

      ArticleModel.exec.called.should.be.true;
      ArticleModel.categoriesCount.called.should.be.true;

    }));

    it('Render de article view', sinon.test(function () {

      req.params.slug = '/blog/slug';

      this.spy(res, 'render');

      blog.getArticle(req, res, next);

      res.render.calledWith('blog/article').should.be.true;

    }));

    it('Error in Model', sinon.test(function () {

      next = this.spy(next);

      blogKO.getArticle(req, res, next);

      next.called.should.be.true;

    }));  

  });  

});