﻿var mongoose = require('mongoose') // DB driver
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
  async.parallel({
    categories: function (callback) {
      Summary.categoriesCount(callback);
    },
    tags: function (callback) {
      Summary.tagsCount(callback);
    },
  },
  function (err, words) {
    var i
      , categories = words.categories[0]
      , tags = words.tags[0]
      , cloud = []
      , body;
    if (err) {
      next();
    } else {
      for (i = 0; i < categories.length; i++) { 
        cloud.push({
            text: categories[i]._id
          , weight: categories[i].value
          , link: '/blog/category/' + categories[i]._id
        });
      } 
      for (i = 0; i < tags.length; i++) { 
        cloud.push({
            text: tags[i]._id
          , weight: tags[i].value
          , link: '/blog/tag/' + tags[i]._id
        });
      }
      body = JSON.stringify(cloud);
      res.writeHead(
          200
        , {
              'Content-Type': 'application/json'
            , 'Content-Length': body.length
            , 'Access-Control-Allow-Origin': '*'
        }
      );
      res.end(body); 
    }
  });
}
