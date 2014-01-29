/* jslint node: true */
'use strict';

var async = require('async');
var parser = require('../utils/mdparser');

function HomeController(ArticleService) {

  // public
  
  function show(req, res, next) {
    var tasks = {
      articles: function articlesTask(callback) {
        ArticleService.findLast(callback);
      },
      categories: function categoriesTask(callback) {
        ArticleService.countCategories(callback);
      }
    };

    async.parallel(tasks, function tasksDone(err, blog) {
      if (err) {
        return next(err);
      }
      res.render('home', {
        title: 'Daniel García Aubert - Software Engineer',
        section:'home',
        articles: parser(blog.articles),
        categories: blog.categories[0]
      });
    });
  }
  
  // expose
  
  return {
    'show': show
  };
}

module.exports = HomeController;
