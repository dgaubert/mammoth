var mongoose = require('mongoose') // DB driver
  , db = mongoose.createConnection('mongodb://localhost/mammoth') // DB conexion
  , async = require('async') // Control flow
  , summarySchema = require('../models/summary') // Load schema
  , Summary = db.model('Summary', summarySchema) // Load model
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
        , titles: (function () {
            var t = []
              , key;
            for (key in blog.titles) {
              t.push(blog.titles[key].title);    
            }
            return t;      
          })()
        , categories: blog.categories
        , tags: blog.tags
      });
    }
  });
}
/*
exports.titles = function(req, res){
  Summary.titles({}, function (err, titles) {
    var body
      , t = []
      , key;
    for (key in titles) {
      t.push(titles[key].title);    
    }
    body = JSON.stringify(t);
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(body);
  });
};

exports.categories = function(req, res){
  Summary.categories({}, function (err, categories) {
    var body = JSON.stringify(categories);
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(body);
  });
};

exports.tags = function(req, res){
  Summary.tags({}, function (err, tags) {
    var body = JSON.stringify(tags);
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(body);
  });
};
*/

exports.view = function (req, res) {
  // Fake post database
  var post = {  
    title: 'TinyOS 2.x',
    author: 'Daniel Gaubert',
    created: '10/10/2010',
    slug: 'tinyos-2',
    category: 'development',
    content: 'Macros are a powerful feature of LispyScript. They are much more powerful than C  define macros. While C #define macros do string substitution, LispyScript macros are code generators Functions take values as arguments and return a value. Macros take code as arguments, and then return ode. Understanding this difference and its ramifications is the key to writing proper macros. Functions get evaluated at runtime. Macros get evaluated at compile time, or pre-compile time to be more precise.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?',
    tags: ['wsn','tinyos','sensor'],
    comments: '6'
  };
  var categories = [
    {
      name: 'desarrollo',
      count: '25'
    },
    {
      name: 'miscelanea',
      count: '14'
    },
    {
      name: 'marketing',
      count: '2'
    },
    {
      name: 'diseño',
      count: '45'
    },
    {
      name: 'otros',
      count: '2'
    }
  ];
  
  var similars = [
      {  
        title: 'TinyOS 2.x',
        slug: 'tinyos-2',
      }
    , {
        title: 'Git model branching', 
        slug: 'git-model-branching',
      }
    , {
        title: 'LispyScript Macros',
        slug: 'lispyscript-macros',
      }
  ];

  res.render('post', { 
      title:post.title
    , section:'blog'
    , post:post
    , categories:categories
    , similars:similars
  });
};
