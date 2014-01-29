/* jslint node:true */
/* global describe: true, it:true*/
'use strict';
var sinon = require('sinon'),
    Article = require('../lib/models/article'),
    articleService = require('../lib/services/article')(Article),
    blogController = require('../lib/controllers/blog'),
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
      var articleServiceStub = this.stub(articleService),
          blogCntlr = new blogController(articleServiceStub);
      
      blogCntlr.list(req, res, next);
      
      articleServiceStub.findPublishedByCategoryOrTag.called.should.equal(true);
      articleServiceStub.countPublishedByCategoryOrTag.called.should.equal(true);

    }));


    it('Blog view should be rendered', sinon.test(function () {
      var articleServiceStub = this.stub(articleService),
          blogCntlr = new blogController(articleServiceStub);

      this.spy(res, 'render');
      
      blogCntlr.list(req, res, next);

      articleServiceStub.findPublishedByCategoryOrTag.callArgWith(3, null, [new ArticleFake()]);
      articleServiceStub.countPublishedByCategoryOrTag.callArgWith(2, null, 1);
      
      res.render.calledWith('blog/blog').should.equal(true);
      
    }));

    it('Error to find articles publised', sinon.test(function () {
      var articleServiceStub = this.stub(articleService),
          blogCntlr = new blogController(articleServiceStub);

      next = this.spy(next);

      blogCntlr.list(req, res, next);

      articleServiceStub.findPublishedByCategoryOrTag.callArgWith(3, new Error(), null);

      next.called.should.equal(true);

    }));

  });

  describe('.retrieve', function () {

    it('Article should be gotten', sinon.test(function () {
      var articleServiceStub = this.stub(articleService),
          blogCntlr = new blogController(articleServiceStub);

      blogCntlr.retrieve(req, res, next);

      articleServiceStub.findBySlug.called.should.equal(true);
      articleServiceStub.countCategories.called.should.equal(true);
      articleServiceStub.countTags.called.should.equal(true);
      articleServiceStub.findLastThree.called.should.equal(true);

    }));

    it('Render de article view', sinon.test(function () {
      var articleServiceStub = this.stub(articleService),
          blogCntlr = new blogController(articleServiceStub);

      req.params.slug = '/blog/slug';
      
      this.spy(res, 'render');
      
      blogCntlr.retrieve(req, res, next);

      articleServiceStub.findBySlug.callArgWith(1, null, new ArticleFake());
      articleServiceStub.countCategories.callArgWith(0, null, 1);
      articleServiceStub.countTags.callArgWith(0, null, 1);
      articleServiceStub.findLastThree.callArgWith(0, null, [new ArticleFake()]);
      articleServiceStub.findByCategory.callArgWith(1, null, [new ArticleFake()]);
      
      res.render.calledWith('blog/article').should.equal(true);

    }));

    it('Error in Article', sinon.test(function () {
      var articleServiceStub = this.stub(articleService),
          blogCntlr = new blogController(articleServiceStub);

      next = this.spy(next);

      blogCntlr.retrieve(req, res, next);

      articleServiceStub.findBySlug.callArgWith(1, new Error(), null);

      next.called.should.equal(true);

    }));

  });

});
