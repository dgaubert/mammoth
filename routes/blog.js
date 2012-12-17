// Creates db conexion
var mongoose = require('mongoose')
  , db = mongoose.createConnection('mongodb://localhost/mammoth');

// Load correponding model
var summarySchema = require('../models/summary')
  , Summary = db.model('Summary', summarySchema);

exports.list = function (req, res) {
  var page = parseInt(req.params.page, 10) || 0;

  async.parallel({
      summaries: function(){
        var filter = {};
        Summary.findRange(filter, page, function (error, summaries) {});
      },
      pagination: function(){
        var filter = {};
        Summary.pagination(filter, function (error, total) {});
      },
  },
  function(err, blog) {

    var pagination
      , getPages
      , start
      , end;

    if (error) {
      console.log(err);
      // No db available
      blog.summaries = [{}];
      pagination = [{}];
    } else {
      // Returns a dataset with page info
      getPages = function () {
        var pages = []
          , i
          , pagesCount
          , pageStart
          , pageEnd;
        // Calculates total pages
        if ((blog.total/limit) % 1 !== 0) {
          pagesCount = Math.floor(blog.total/limit) + 1;
        } else {
          pagesCount = Math.floor(blog.total/limit);      
        }
        // Builds pages with its start & end item number
        for (i = 0; i < pagesCount ; i = i + 1) {
          pageStart = (i * limit) + 1;
          pageEnd = pageStart + limit - 1;
          if (pageEnd > blog.total) {
            pageEnd = blog.total;
          }
          pages.push({
              label: i + 1
            , selected: (i + 1) === pageStart ? true : false
          });
        }
        return pages;
      }
      // Initialize start and end of page selected 
      start = skip + 1;
      end = (skip + limit) > blog.total ? blog.total : (skip + limit);
      // Builds the entire pagination structure
      pagination = {
          selected: start === end ? start : start + '-' + end + ' de ' + blog.total
        , pages: getPages()
        , previousPage: (page - 1) < 0 ? 0 : (page -1)
        , nextPage: (page + 1) > blog.total ? blog.total : (page + 1)
      }
    }

    res.render('blog', { 
        title: 'Blog - Daniel García Aubert'
      , section:'blog'
      , summaries: blog.summaries
      , pagination: pagination
    });
  });
}

exports.view = function (req, res) {
  console.log("Slug:" + req.params.slug);
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

  res.render('post', { title:post.title, section:'blog', post:post, categories:categories, similars:similars});
};
/*
exports.list = function (req, res) {
  var skip = parseInt(req.params.skip, 10) || 0;
  var limit = parseInt(req.params.limit, 10) || 10;
  // Static method
  Summary.findRange(skip, limit, function (error, summaries) {
    if (error) {
      console.log(err);
      summaries = [{}];
    }
    res.render('includes/summary', {summaries: summaries});
  });
}

exports.pagination = function (req, res) {
  var skip = parseInt(req.params.start, 10) || 0
    , limit = parseInt(req.params.limit, 10) || 10;

  Summary.pagination(function (error, total) {
    var pagination
      , getPages
      , start
      , end;
    if (error) {
      console.log(err);
      // No pagination available
      pagination = [{}];
    } else {
      // Checks skip & limit values
      if (skip < 0 || skip > total) {
        skip = 0;
      }
      if (limit < 0 || limit > total) {
        limit = 10;
      }
      // Returns a dataset with page info
      getPages = function () {
        var pages = []
          , i
          , pagesCount
          , pageStart
          , pageEnd;
        // Calculates total pages
        if ((total/limit) % 1 !== 0) {
          pagesCount = Math.floor(total/limit) + 1;
        } else {
          pagesCount = Math.floor(total/limit);      
        }
        // Builds pages with its start & end item number
        for (i = 0; i < pagesCount ; i = i + 1) {
          pageStart = (i * limit) + 1;
          pageEnd = pageStart + limit - 1;
          if (pageEnd > total) {
            pageEnd = total;
          }
          pages.push({
              label: pageStart === pageEnd ? pageStart : pageStart + ' - ' + pageEnd
            , skip: (pageStart + limit)
            , limit: limit
            , selected: (skip + 1) === pageStart ? true : false
          });
        }
        return pages;
      }
      // Initialize start and end of page selected 
      start = skip + 1;
      end = (skip + limit) > total ? total : (skip + limit);
      // Builds the entire pagination structure
      pagination = {
          selected: start === end ? start : start + '-' + end + ' de ' + total
        , pages: getPages()
        , hasPrevious: start > 1 ? true : false
        , hasNext: end < total ? true : false
        , previousSkip: (skip - limit) < 0 ? 0 : (skip - limit)
        , nextSkip: (skip + limit) > total ? total : (skip + limit)
        , limit: limit
      }
    }
    res.render('includes/pagination', {pagination: pagination});
  });
}

exports.titles = function(req, res){
  var titles = [
    'Git model branching',
    'LispyScript Macros',
    'TinyOS 2.x'
  ];
  var body = JSON.stringify(titles);
  res.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': body.length, 'Access-Control-Allow-Origin': '*'});
  res.end(body);
};

exports.tags = function(req, res){
  var tags = [
    'git',
    'wsn',
    'tinyos',
    'sensor',
    'workflow',
    'macros',
    'script'
  ];
  var body = JSON.stringify(tags);
  res.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': body.length, 'Access-Control-Allow-Origin': '*'});
  res.end(body);
};

exports.categories = function(req, res){
  var categories = [
    'desarrollo',
    'miscelanea'
  ];
  var body = JSON.stringify(categories);
  res.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': body.length, 'Access-Control-Allow-Origin': '*'});
  res.end(body);
};
*/
