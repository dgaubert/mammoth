var sinon = require('sinon'),
    ArticleModel = require('./support/article'),
    Article = require('../lib/routes/article'),
    Picture = require('./support/picture'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/article', function () {

  // fake request body form
  req.body.title = 'test';
  req.body.author = 'test';
  req.body.slug = 'test';
  req.body.category = 'test';
  req.body.abstract = 'test';
  req.body.content = 'test';
  req.body.tags = 'test,test';

  describe('.getArticles(req, res, next)', function () {

    it('Articles should be gotten', sinon.test(function () {

      var article = new Article(ArticleModel.ok(), Picture);

      this.spy(ArticleModel, 'exec');

      article.getArticles(req, res, next);

      ArticleModel.exec.called.should.be.true;

    }));
    
    
    it('Response should be rendered', sinon.test(function () {

      var article = new Article(ArticleModel.ok(), Picture);

      this.spy(res, 'render');

      article.getArticles(req, res, next);

      res.render.calledWith('blog/admin/articles').should.be.true;

    }));


    it('Response should not be rendered', sinon.test(function () {

      var article = new Article(ArticleModel.ko(), Picture);

      next = this.spy(next);

      article.getArticles(req, res, next);

      next.called.should.be.true;

    }));
    

  });

  describe('.getNewArticle(req, res)', function () {

    it('View should be rendered', sinon.test(function () {

      var article = new Article(ArticleModel.ok(), Picture);

      this.spy(res, 'render');

      article.getNewArticle(req, res);

      res.render.calledWith('blog/admin/article').should.be.true;

    }));

  });

  describe('.newArticle(req, res)', function () {

    it('Article should be gotten', sinon.test(function () {

      var article = new Article(ArticleModel.ok(), Picture);

      this.spy(ArticleModel, 'exec');

      article.newArticle(req, res, next);

      ArticleModel.exec.called.should.be.true;

    }));

    it('Exists the article to save', sinon.test(function () {

      var article = new Article(ArticleModel.ok(), Picture);

      next = this.spy(next);

      article.newArticle(req, res, next);

      next.called.should.be.true;

    }));

  });

  describe('.getArticle(req, res, next)', function () {

    it('Article should be gotten', sinon.test(function () {

      var article = new Article(ArticleModel.ok(), Picture);

      this.spy(ArticleModel, 'exec');

      article.getArticle(req, res, next);

      ArticleModel.exec.called.should.be.true;

    }));
    
    it('Response should be rendered', sinon.test(function () {

      var article = new Article(ArticleModel.ok(), Picture);

      this.spy(res, 'render');

      article.getArticle(req, res, next);

      res.render.calledWith('blog/admin/article').should.be.true;

    }));

    it('Response should not be rendered', sinon.test(function () {

      var article = new Article(ArticleModel.ko(), Picture);

      next = this.spy(next);

      article.getArticle(req, res, next);

      next.called.should.be.true;
      
    }));

  });

  describe('.updateArticle(req, res, next)', function () {

    it('Article should be gotten', sinon.test(function () {

      var article = new Article(ArticleModel.ok(), Picture);

      this.spy(ArticleModel, 'exec');

      article.updateArticle(req, res, next);

      ArticleModel.exec.called.should.be.true;

    }));

  });

});
