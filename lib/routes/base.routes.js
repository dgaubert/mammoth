'use strict';

var BaseRoutes = {
  addTo: function (router, routes, path) {
    var _this = this;
    path = path || '';
    routes = routes || this.get();

    Object.keys(routes)
      .forEach(function (key) {
        if (typeof routes[key] === 'function') {
          router[key](path, routes[key]);
        } else if (typeof routes[key] === 'object') {
          if (routes[key] instanceof Array) {
            var params = [path].concat(routes[key]);
            router[key].apply(router, params);
          } else {
            _this.addTo(router, routes[key], path + key);
          }
        }
      });
  }
};

module.exports = BaseRoutes;
