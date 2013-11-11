var support = require('./support'),
    sinon = require('sinon'),
    Blog = require('../lib/routes/blog'),
    Model = support.Model,
    req = support.req,
    res = support.res,
    next = support.next;

describe('routes/login', function () {

  // Set model
  Model.setModel(support.article);

  describe('.getSummary', function () {

    req.params.page = 0;
    req.params.category = 'category';
    req.params.tag = ['tag'];

    it('Summary should be gotten', sinon.test(function () {

      var blog = new Blog(Model.ok());
      
      this.spy(Model, 'exec');
      this.spy(Model, 'count');
      
      blog.getSummary(req, res, next);
      
      Model.exec.called.should.be.true;
      Model.count.called.should.be.true;

    }));

    it('Blog view should be rendered', sinon.test(function () {

      var blog = new Blog(Model.ok());
      
      this.spy(res, 'render');
      
      blog.getSummary(req, res, next);
      
      res.render.calledWith('blog/blog').should.be.true;
      
    }));

    it('Error in Model', sinon.test(function () {

      var blog = new Blog(Model.ko());

      next = this.spy(next);

      blog.getSummary(req, res, next);

      next.called.should.be.true;

    }));

  });

  describe('.getArticle', function () {

    it('Article should be gotten', sinon.test(function () {

      var blog = new Blog(Model.ok());

      this.spy(Model, 'exec');
      this.spy(Model, 'categoriesCount');

      blog.getArticle(req, res, next);

      Model.exec.called.should.be.true;
      Model.categoriesCount.called.should.be.true;

    }));

    it('Render de article view', sinon.test(function () {

       var blog = new Blog(Model.ok());

      req.params.slug = '/blog/slug';

      this.spy(res, 'render');

      blog.getArticle(req, res, next);

      res.render.calledWith('blog/article').should.be.true;

    }));

    it('Error in Model', sinon.test(function () {

      var blog = new Blog(Model.ko());

      next = this.spy(next);

      blog.getArticle(req, res, next);

      next.called.should.be.true;

    }));  

  });  

});