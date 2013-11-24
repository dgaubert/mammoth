var sinon = require('sinon'),
    Article = require('./support/article'),
    Blog = require('../lib/routes/blog'),
    support = require('./support/support'),
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/blog', function () {

  describe('.getSummary', function () {

    req.params.page = 0;
    req.params.category = 'category';
    req.params.tag = ['tag'];

    it('Summary should be gotten', sinon.test(function () {

      var blog = new Blog(Article.ok());

      this.spy(Article, 'exec');
      this.spy(Article, 'count');
      
      blog.getSummary(req, res, next);
      
      Article.exec.called.should.be.true;
      Article.count.called.should.be.true;

    }));

    it('Blog view should be rendered', sinon.test(function () {

      var blog = new Blog(Article.ok());
      
      this.spy(res, 'render');
      
      blog.getSummary(req, res, next);
      
      res.render.calledWith('blog/blog').should.be.true;
      
    }));

    it('Error in Article', sinon.test(function () {

      var blog = new Blog(Article.ko());

      next = this.spy(next);

      blog.getSummary(req, res, next);

      next.called.should.be.true;

    }));

  });

  describe('.getArticle', function () {

    it('Article should be gotten', sinon.test(function () {

      var blog = new Blog(Article.ok());

      this.spy(Article, 'exec');
      this.spy(Article, 'categoriesCount');

      blog.getArticle(req, res, next);

      Article.exec.called.should.be.true;
      Article.categoriesCount.called.should.be.true;

    }));

    it('Render de article view', sinon.test(function () {

      var blog = new Blog(Article.ok());

      req.params.slug = '/blog/slug';

      this.spy(res, 'render');

      blog.getArticle(req, res, next);

      res.render.calledWith('blog/article').should.be.true;

    }));

    it('Error in Article', sinon.test(function () {

      var blog = new Blog(Article.ko());

      next = this.spy(next);

      blog.getArticle(req, res, next);

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

      var blog = new Blog(Article.ok());

      this.spy(res, 'send');

      blog.newComment(req, res, next);

      res.send.calledWith(200).should.be.true;
      
    }));

    it('Comment should not be created', sinon.test(function () {

      var blog = new Blog(Article.ko());
      
      next = this.spy(next);

      blog.newComment(req, res, next);

      next.called.should.be.true;

    }));

  });

});
