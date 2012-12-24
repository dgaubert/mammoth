var mongoose = require('mongoose') // DB driver
  , db = mongoose.createConnection('mongodb://localhost/mammoth') // DB conexion
  , async = require('async') // Control flow
  , summarySchema = require('../models/summary') // Load schema
  , Summary = db.model('Summary', summarySchema) // Load model
  , postSchema = require('../models/post') // Load schema
  , Post = db.model('Post', postSchema) // Load model
  , paginator = require('../utils/paginator'); // Pagination

// Retrieves blog summary
exports.list = function (req, res) {
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
    },
  },
  function (err, blog) {
    if (err) {
      console.log(err);
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

exports.view = function (req, res) {
  var slug = req.params.slug || '';
  async.parallel({
    post: function (callback) {
      Post.find({'slug': slug}, callback);
    },
    categories: function (callback) {
      Summary.categories({}, callback);
    },
    similars: function (callback) {
      Summary.find({},{'_id': -1, 'title': 1, 'slug': 1}, callback);
    },
  },
  function (err, blog) {
    if (err) {
      console.log(err);
    } else {
      res.render('post', { 
          title: blog.post[0].title + ' - Blog - Daniel García Aubert'
        , section:'blog'
        , post: blog.post[0]
        , categories: blog.categories
        , similars: blog.similars
      });
    }
  });
};
