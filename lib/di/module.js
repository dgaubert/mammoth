'use strict';

var di = require('di');

//-- Model Providers

var Models = require('./models.js');

var providers = Models.map(function(Model) {
    var Provider = function ModelProvider() {
        return Model;
    };
    di.annotate(Provider, new di.Provide(Model));
    return Provider;
});


//-- Router Provider

var RouterProvider = require('./router.provider.js');

providers.push(RouterProvider);

// expose

module.exports = providers;
