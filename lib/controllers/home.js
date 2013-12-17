var homeController = function homeController(ArticleService) {
  var async = require('async');
  var parser = require('../utils/mdparser');
  
  var controller = {
    
    // get home view
    getHome: function getHome(req, res, next) {
      var tasks = {
        articles: function findLastArticleTask(callback) {
          ArticleService.findLast(callback);
        },
        categories: function countArticleCategoriesTask(callback) {
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
  };

  return controller;
};

module.exports = homeController;
