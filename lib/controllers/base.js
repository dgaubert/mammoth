'use strict';

var _ = require('lodash');

var BaseController = {

  renderTemplate: function (res, context) {
    context = _.defaults(context, this.defaultTemplateContext);
    res.render(this.template, context);
  },

  renderTemplateList: function (res, context) {
    context = _.defaults(context, this.defaultTemplateContext);
    res.render(this.templateList, context);
  },

  renderEntity: function (promise, res, next) {
    var _this = this;

    return promise
      .then(function(entity) {
        _this.renderTemplate(res, {
          'entity': entity
        });
      })
      .fail(function(err) {
        next(err);
      });
  },

  renderList: function (promise, res, next) {
    var _this = this;

    return promise
      .then(function(entities) {
        _this.renderTemplateList(res, {
          'entities': entities
        });
      })
      .fail(function(err) {
        next(err);
      });
  },

  redirectToEntity: function (promise, res, next) {
    var _this = this;

    return promise
      .then(function(entity) {
        var id = entity[_this.propertyAsParamId];
        var pathToRedirect = _this.path + id;

        res.redirect(pathToRedirect);
      })
      .fail(function(err) {
        next(err);
      });
  },

  redirectToList: function (promise, res, next) {
    var _this = this;

    return promise
      .then(function() {
        res.redirect(_this.path);
      })
      .fail(function(err) {
        next(err);
      });
  },

  list: function (req, res, next) {
    var listing = this.service.list();
    return this.renderList(listing, res, next);
  },

  show: function (req, res) {
    this.renderTemplate(res, {});
  },

  create: function (req, res, next) {
    var data = this.mapper ? this.mapper.sanitizeData(req.body) : req.body;
    var creating = this.service.create(data);

    return this.redirectToEntity(creating, res, next);
  },

  retrieve: function (req, res, next) {
    var id = req.params[this.propertyAsParamId];
    var retrienving = this.service.retrieve(id);

    return this.renderEntity(retrienving, res, next);
  },

  update: function (req, res, next) {
    var id = req.params[this.propertyAsParamId];
    var data = this.mapper ? this.mapper.sanitizeData(req.body) : req.body;
    var updating = this.service.update(id, data);

    return this.renderEntity(updating, res, next);
  },

  remove: function (req, res, next) {
    var id = req.params[this.propertyAsParamId];
    var removing = this.service.remove(id);

    return this.redirectToList(removing, res, next);
  }
};

module.exports = BaseController;
