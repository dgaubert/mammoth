var mongoose = require('mongoose'), // DB driver
    db = mongoose.createConnection('mongodb://localhost/mammoth'), // DB conexion
    async = require('async'), // Control flow
    summarySchema = require('../models/summary'), // Load schema
    Summary = db.model('Summary', summarySchema), // Load model
    articleSchema = require('../models/article'), // Load schema
    Article = db.model('Article', articleSchema), // Load model
    paginator = require('../utils/paginator'); // Pagination

// Retrieves blog summary
exports.getSummary = function (req, res, next) {
  var page = parseInt(req.params.page, 10) || 0,
      category = req.params.category,
      tag = req.params.tag,
      filter = {};
  if (category) {
    filter = {'category': category};
  } else if (tag) {
    filter = {'tags':{$in:tag}};
  }
  async.parallel({
    summaries: function (callback) {
      Summary.findRange(filter, page, callback);
    },
    count: function (callback) {
      Summary.count(filter, callback);
    }
  },
  function (err, blog) {
    if (err || blog.summaries.length <= 0) {
      next();
    } else {
      res.render('blog', {
        title: 'Blog - Daniel García Aubert',
        section:'blog',
        summaries: blog.summaries,
        pagination: paginator.create(page, blog.count)
      });
    }
  });
};

exports.getArticle =  function (req, res, next) {
  var slug = req.params.slug || '';
  async.parallel({
    article: function (callback) {
      Article.find({'slug': slug}, callback);
    },
    categories: function (callback) {
      Summary.categoriesCount(callback);
    }
  },
  function (err, blog) {
    if (err || blog.article.length <= 0) {
      next();
    } else {
      Summary.find({
        'category': blog.article[0].category},
        {
          '_id': -1, 'title': 1, 'slug': 1
        },
        function (err, similars) {
          res.render('article', {
            title: blog.article[0].title + ' - Blog - Daniel García Aubert',
            section:'blog',
            article: blog.article[0],
            categories: blog.categories[0],
            similars: similars
          });
        }
      );
    }
  });
};

exports.newComment = function (req, res, next) {
  var slug = req.params.slug || '';
  var comment = {
    author: req.body.name,
    mail: req.body.mail,
    created: new Date(),
    comment: req.body.comment.replace(/\n/g, '<br/>')
  };
  Article.findOne({'slug': slug}, function (err, article) {
    if (err) {
      next();
    } else {
      article.comments.push(comment);
      article.save(function (err) {
        if (err) {
          next(new Error('Save comment fails'));
        }
        res.redirect('/blog/' + slug + '#lastCommnent');
      });
    }
  });
};

exports.getWordCloud = function (req, res, next) {
  async.parallel({
    categories: function (callback) {
      Summary.categoriesCount(callback);
    },
    tags: function (callback) {
      Summary.tagsCount(callback);
    }
  },
  function (err, words) {
    var i,
        categories = words.categories[0],
        tags = words.tags[0],
        cloud = [],
        body;

    if (err) {
      next();
    } else {
      for (i = 0; i < categories.length; i++) {
        cloud.push({text: categories[i]._id,
          weight: categories[i].value,
          link: '/blog/category/' + categories[i]._id
        });
      }
      for (i = 0; i < tags.length; i++) {
        cloud.push({text: tags[i]._id,
          weight: tags[i].value,
          link: '/blog/tag/' + tags[i]._id
        });
      }
      body = JSON.stringify(cloud);
      res.writeHead(200,
        {'Content-Type': 'application/json',
          'Content-Length': body.length,
          'Access-Control-Allow-Origin': '*'
        }
      );
      res.end(body);
    }
  });
};