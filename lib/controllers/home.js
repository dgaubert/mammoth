/* jslint node: true */
'use strict';

var parser = require('../utils/mdparser');

var HomeController = function HomeController(homeService) {
  this.homeService = homeService;
};

HomeController.prototype = {

  // public

  show: function show(req, res, next) {
    this.homeService.show(function showHomeDone(err, home) {
      if (err) return next(err);

      res.render('home', {
        title: 'Daniel García Aubert - Software Engineer',
        section:'home',
        articles: parser(home.articles),
        categories: home.categories[0]
      });
    });
  }
};
module.exports = HomeController;
