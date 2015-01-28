'use strict';

var _ = require('lodash');

var baseRoutes = {

  addTo: function (router, routes, path) {
    var _this = this;

    path = path || '';
    routes = routes || this.get();

    _.keys(routes)
      .forEach(function (key) {

        if (_.isFunction(routes[key])) {
          return router[key](path, routes[key]);
        }

        if (_.isArray(routes[key])) {
          var params = [path].concat(routes[key]);
          return router[key].apply(router, params);
        }

        if (_.isObject(routes[key])) {
          return _this.addTo(router, routes[key], path + key);
        }

      });
  }

};

module.exports = baseRoutes;
