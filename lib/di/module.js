'use strict';

var di = require('di');

//-- Model Providers

var Models = require('./models.js');

var providers = Models.map(function(Model) {
  var ModelProvider = function ModelProvider() {
    return Model;
  };
  di.annotate(ModelProvider, new di.Provide(Model));

  return ModelProvider;
});

//-- Router Provider

var RouterProvider = require('./router.provider.js');

providers.push(RouterProvider);

// expose

module.exports = providers;
