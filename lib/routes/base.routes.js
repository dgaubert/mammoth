'use strict';

var BaseRoutes = {
  addTo: function addTo(router, routes, path) {
    path = path || '';
    routes = routes || this.get();
    var me = this;
    Object.keys(routes).forEach(function (key) {
      if (typeof routes[key] === 'function') {
        router[key](path, routes[key]);
      } else if (typeof routes[key] === 'object') {
        if (routes[key] instanceof Array) {
          var params = [path].concat(routes[key]);
          router[key].apply(router, params);
        } else {
          me.addTo(router, routes[key], path + key);
        }
      }
    });
  }
};

module.exports = BaseRoutes;
