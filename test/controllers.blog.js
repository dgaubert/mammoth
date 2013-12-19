var sinon = require('sinon'),
    Article = require('../lib/models/article'),
    ArticleService = require('../lib/services/article')(Article),
    BlogController = require('../lib/controllers/blog'),
    ArticleFake = require('./support/article'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/blog', function () {

  describe('.list', function () {

    req.params.page = 0;
    req.params.category = 'category';
    req.params.tag = ['tag'];

    it('Summary should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          blog = new BlogController(ArticleServiceStub);
      
      blog.list(req, res, next);
      
      ArticleServiceStub.findPublishedByCategoryOrTag.called.should.be.true;
      ArticleServiceStub.countPublishedByCategoryOrTag.called.should.be.true;

    }));


    it('Blog view should be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          blog = new BlogController(ArticleServiceStub);

      this.spy(res, 'render');
      
      blog.list(req, res, next);

      ArticleServiceStub.findPublishedByCategoryOrTag.callArgWith(3, null, [new ArticleFake()]);
      ArticleServiceStub.countPublishedByCategoryOrTag.callArgWith(2, null, 1);
      
      res.render.calledWith('blog/blog').should.be.true;
      
    }));

    it('Error to find articles publised', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          blog = new BlogController(ArticleServiceStub);

      next = this.spy(next);

      blog.list(req, res, next);

      ArticleServiceStub.findPublishedByCategoryOrTag.callArgWith(3, new Error(), null);

      next.called.should.be.true;

    }));

  });

  describe('.retrieve', function () {

    it('Article should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          blog = new BlogController(ArticleServiceStub);

      blog.retrieve(req, res, next);

      ArticleServiceStub.findBySlug.called.should.be.true;
      ArticleServiceStub.countCategories.called.should.be.true;
      ArticleServiceStub.countTags.called.should.be.true;
      ArticleServiceStub.findLastThree.called.should.be.true;

    }));

    it('Render de article view', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          blog = new BlogController(ArticleServiceStub);

      req.params.slug = '/blog/slug';
      
      this.spy(res, 'render');
      
      blog.retrieve(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, null, new ArticleFake());
      ArticleServiceStub.countCategories.callArgWith(0, null, 1);
      ArticleServiceStub.countTags.callArgWith(0, null, 1);
      ArticleServiceStub.findLastThree.callArgWith(0, null, [new ArticleFake()]);
      ArticleServiceStub.findByCategory.callArgWith(1, null, [new ArticleFake()]);
      
      res.render.calledWith('blog/article').should.be.true;

    }));

    it('Error in Article', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          blog = new BlogController(ArticleServiceStub);

      next = this.spy(next);

      blog.retrieve(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, new Error(), null);

      next.called.should.be.true;

    }));

  });

});
