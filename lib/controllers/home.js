'use strict';

var di = require('di');
var _ = require('lodash');
var BaseController = require('./base');
var HomeService = require('../services/home');
var parser = require('../utils/mdparser');

function HomeController(homeService) {
  this.service = homeService;
  this.template = 'home';
  this.defaultTemplateContext = {
    title: 'Daniel García Aubert - Software Engineer',
    section: 'home'
  };
}

HomeController.prototype = _.create(BaseController, {

  constructor: HomeController,

  show: function (req, res, next) {
    var _this = this;

    this.service.show()
      .then(function (home) {
        _this.renderTemplate(res, {
          articles: parser(home.articles),
          categories: home.categories
        });
      })
      .fail(function (err) {
        next(err);
      });
  }
});

di.annotate(HomeController, new di.Inject(HomeService));

module.exports = HomeController;
