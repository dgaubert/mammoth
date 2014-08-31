/* jslint node: true */
'use strict';

var parser = require('../utils/mdparser');

module.exports = function homeController(homeService) {

  // public

  function show(req, res, next) {
    homeService.show(function showHomeDone(err, home) {
      if (err) return next(err);

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
};
