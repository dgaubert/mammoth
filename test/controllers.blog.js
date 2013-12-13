var sinon = require('sinon'),
    ArticleService = require('../lib/services/article'),
    Article = require('./support/article'),
    BlogController = require('../lib/controllers/blog'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('controllers/blog', function () {

  describe('.getSummary', function () {

    req.params.page = 0;
    req.params.category = 'category';
    req.params.tag = ['tag'];

    it('Summary should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          blog = new BlogController(ArticleServiceStub);
      
      blog.getSummary(req, res, next);
      
      ArticleServiceStub.findPublishedByCategoryOrTag.called.should.be.true;
      ArticleServiceStub.countPublishedByCategoryOrTag.called.should.be.true;

    }));


    it('Blog view should be rendered', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          blog = new BlogController(ArticleServiceStub);

      this.spy(res, 'render');
      
      blog.getSummary(req, res, next);

      ArticleServiceStub.findPublishedByCategoryOrTag.callArgWith(3, null, [new Article()]);
      ArticleServiceStub.countPublishedByCategoryOrTag.callArgWith(2, null, 1);
      
      res.render.calledWith('blog/blog').should.be.true;
      
    }));

    it('Error to find articles publised', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          blog = new BlogController(ArticleServiceStub);

      next = this.spy(next);

      blog.getSummary(req, res, next);

      ArticleServiceStub.findPublishedByCategoryOrTag.callArgWith(3, new Error(), null);

      next.called.should.be.true;

    }));

  });

  describe('.getArticle', function () {

    it('Article should be gotten', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          blog = new BlogController(ArticleServiceStub);

      blog.getArticle(req, res, next);

      ArticleServiceStub.findBySlug.called.should.be.true;
      ArticleServiceStub.categoriesCount.called.should.be.true;
      ArticleServiceStub.tagsCount.called.should.be.true;
      ArticleServiceStub.findLastThree.called.should.be.true;

    }));

    it('Render de article view', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          blog = new BlogController(ArticleServiceStub);

      req.params.slug = '/blog/slug';
      
      this.spy(res, 'render');
      
      blog.getArticle(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, null, new Article());
      ArticleServiceStub.categoriesCount.callArgWith(0, null, 1);
      ArticleServiceStub.tagsCount.callArgWith(0, null, 1);
      ArticleServiceStub.findLastThree.callArgWith(0, null, [new Article()]);
      ArticleServiceStub.findByCategory.callArgWith(1, null, [new Article()]);
      
      res.render.calledWith('blog/article').should.be.true;

    }));

    it('Error in Article', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          blog = new BlogController(ArticleServiceStub);

      next = this.spy(next);

      blog.getArticle(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, new Error(), null);

      next.called.should.be.true;

    }));

  });

  describe('.newComment(req, res, next)', function () {

    req.body.comment = 'comment';
    req.body.name = 'Daniel G. Aubert';
    req.body.mail = 'danielgarciaaubert@gmail.com';

    req.body.challengeId = 1;
    req.body.challengeValue = 'x';

    it('Comment should be created', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          blog = new BlogController(ArticleServiceStub);

      this.spy(res, 'send');

      blog.newComment(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, null, new Article());

      res.send.calledWith(200).should.be.true;
      
    }));

    it('Comment should not be created', sinon.test(function () {
      var ArticleServiceStub = this.stub(ArticleService),
          blog = new BlogController(ArticleServiceStub);
      
      next = this.spy(next);

      blog.newComment(req, res, next);

      ArticleServiceStub.findBySlug.callArgWith(1, new Error(), null);

      next.called.should.be.true;

    }));

  });

});
