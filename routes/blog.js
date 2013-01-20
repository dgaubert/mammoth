var mongoose = require('mongoose') // DB driver
  , db = mongoose.createConnection('mongodb://localhost/mammoth') // DB conexion
  , async = require('async') // Control flow
  , summarySchema = require('../models/summary') // Load schema
  , Summary = db.model('Summary', summarySchema) // Load model
  , postSchema = require('../models/post') // Load schema
  , Post = db.model('Post', postSchema) // Load model
  , paginator = require('../utils/paginator'); // Pagination

// Retrieves blog summary
exports.getSummary = function (req, res, next) {
  var page = parseInt(req.params.page, 10) || 0;
  async.parallel({
    summaries: function (callback) {
      Summary.findRange({}, page, callback);
    },
    count: function (callback) {
      Summary.count({}, callback);
    },
    titles: function (callback) {
      Summary.titles({}, callback);
    },
    categories: function (callback) {
      Summary.categories({}, callback);
    },
    tags: function (callback) {
      Summary.tags({}, callback);
    }
  },
  function (err, blog) {
    if (err || blog.summaries.length <= 0) {
      next();
    } else {
      res.render('blog', { 
          title: 'Blog - Daniel García Aubert'
        , section:'blog'
        , summaries: blog.summaries
        , pagination: paginator.create(page, blog.count)
        , titles: blog.titles
        , categories: blog.categories
        , tags: blog.tags
      });
    }
  });
}

exports.getPost =  function (req, res, next) {
  var slug = req.params.slug || '';
  async.parallel({
    post: function (callback) {
      Post.find({'slug': slug}, callback);
    },
    categories: function (callback) {
      Summary.categoriesCount(callback);
    },
    similars: function (callback) {
      Summary.find({},{'_id': -1, 'title': 1, 'slug': 1}, callback);
    },
  },
  function (err, blog) {
    if (err || blog.post.length <= 0) {
      next();
    } else {
      res.render('post', { 
          title: blog.post[0].title + ' - Blog - Daniel García Aubert'
        , section:'blog'
        , post: blog.post[0]
        , categories: blog.categories[0]
        , similars: blog.similars
      });
    }
  });
};

exports.newComment = function (req, res, next) {
  var slug = req.params.slug || '';
  console.log(req.body.comment);
  var comment = {
      author: req.body.name
    , mail: req.body.mail
    , created: new Date()
    , comment: req.body.comment.replace(/\n/g, '<br/>')
  };
  Post.findOne({'slug': slug}, function (err, post) {
    if (err) {
      next();
    } else {
      post.comments.push(comment);
      post.save(function (err) {
        if (err) {
          next(new Error('Save comment fails'));
        }
        res.redirect('/blog/' + slug + '#lastCommnent');
      });
    }
  });
}

exports.getWordCloud = function (req, res, next) {
  /*
  async.parallel({
    tags: function (callback) {
      Summary.tags({}, callback);
    },
    categories: function (callback) {
      Summary.categories({}, callback);
    }
  },
  function (err, words) {
    if (err) {
      next();
    } else {
      var body = buildWordCloud(words);
      res.writeHead(200, {
          'Content-Type': 'application/json'
        , 'Content-Length': body.length
        , 'Access-Control-Allow-Origin': '*'
      });
      res.end(body);
    }
  });
  */
  var words = [
    {text: "Lorem", weight: 13, link: "https://github.com/lucaong/jQCloud"},
    {text: "Ipsum", weight: 10.5, link: "http://jquery.com/"},
    {text: "Dolor", weight: 9.4, link: "http://www.lucaongaro.eu/"},
    {text: "Sit", weight: 8, link: "http://www.lucaongaro.eu/"},
    {text: "Amet", weight: 6.2, link: "http://www.lucaongaro.eu/"},
    {text: "Consectetur", weight: 5, link: "http://www.lucaongaro.eu/"},
    {text: "Adipiscing", weight: 5, link: "http://www.lucaongaro.eu/"},
    {text: "Elit", weight: 5, link: "https://github.com/lucaong/jQCloud"},
    {text: "Nam et", weight: 5, link: "https://github.com/lucaong/jQCloud"},
    {text: "Leo", weight: 4, link: "https://github.com/lucaong/jQCloud"},
    {text: "Sapien", weight: 4, link: "http://www.lucaongaro.eu/"},
    {text: "Pellentesque", weight: 3, link: "https://github.com/lucaong/jQCloud"},
    {text: "habitant", weight: 3, link: "https://github.com/lucaong/jQCloud"},
    {text: "morbi", weight: 3, link: "https://github.com/lucaong/jQCloud"},
    {text: "tristisque", weight: 3, link: "https://github.com/lucaong/jQCloud"},
    {text: "senectus", weight: 3, link: "https://github.com/lucaong/jQCloud"},
    {text: "et netus", weight: 3, link: "https://github.com/lucaong/jQCloud"},
    {text: "et malesuada", weight: 3, link: "https://github.com/lucaong/jQCloud"},
    {text: "fames", weight: 2, link: "https://github.com/lucaong/jQCloud"},
    {text: "ac turpis", weight: 2, link: "https://github.com/lucaong/jQCloud"},
    {text: "egestas", weight: 2, link: "https://github.com/lucaong/jQCloud"},
    {text: "Aenean", weight: 2, link: "https://github.com/lucaong/jQCloud"},
    {text: "vestibulum", weight: 2, link: "https://github.com/lucaong/jQCloud"},
    {text: "elit", weight: 2, link: "https://github.com/lucaong/jQCloud"},
    {text: "sit amet", weight: 2, link: "https://github.com/lucaong/jQCloud"},
    {text: "metus", weight: 2, link: "https://github.com/lucaong/jQCloud"},
    {text: "adipiscing", weight: 2, link: "http://jquery.com/"},
    {text: "ut ultrices", weight: 2, link: "http://jquery.com/"},
    {text: "justo", weight: 1, link: "http://jquery.com/"},
    {text: "dictum", weight: 1, link: "http://jquery.com/"},
    {text: "Ut et leo", weight: 1, link: "http://jquery.com/"},
    {text: "metus", weight: 1, link: "http://jquery.com/"},
    {text: "at molestie", weight: 1, link: "http://jquery.com/"},
    {text: "purus", weight: 1, link: "http://jquery.com/"},
    {text: "Curabitur", weight: 1, link: "http://jquery.com/"},
    {text: "diam", weight: 1, link: "http://jquery.com/"},
    {text: "dui", weight: 1, link: "http://jquery.com/"},
    {text: "ullamcorper", weight: 1, link: "http://jquery.com/"},
    {text: "id vuluptate ut", weight: 1, link: "http://jquery.com/"},
    {text: "mattis", weight: 1, link: "http://jquery.com/"},
    {text: "et nulla", weight: 1, link: "http://jquery.com/"},
    {text: "Sed", weight: 1, link: "http://jquery.com/"}
  ];
  var body = JSON.stringify(words);
  res.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': body.length, 'Access-Control-Allow-Origin': '*'});
  res.end(body);
}
