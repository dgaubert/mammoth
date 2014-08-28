/* jslint node: true */
'use strict';

var parser = require('../utils/mdparser');

function HomeRoute(HomeController) {

  // public

  function show(req, res, next) {
    HomeController.show(function showHomeDone(err, home) {
      if (err) {
        return next(err);
      }

      res.render('home', {
        title: 'Daniel García Aubert - Software Engineer',
        section:'home',
        articles: parser(home.articles),
        categories: home.categories[0]
      });
    });
  }

  // expose

  return {
    'show': show
  };
}

module.exports = HomeRoute;
