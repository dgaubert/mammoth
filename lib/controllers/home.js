'use strict';

var di = require('di');
var HomeService = require('../services/home');
var parser = require('../utils/mdparser');

function HomeController(homeService) {
  this.service = homeService;
}

HomeController.prototype = {

  show: function (req, res, next) {
    this.service.show()
      .then(function (home) {
        res.render('home', {
          title: 'Daniel García Aubert - Software Engineer',
          section:'home',
          articles: parser(home.articles),
          categories: home.categories[0]
        });
      })
      .fail(function (err) {
        next(err);
      });
  }
};

di.annotate(HomeController, new di.Inject(HomeService));

module.exports = HomeController;
