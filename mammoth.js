#!/bin/env node

var enviroment = require('./lib/conf/env');

// setup the enviroment
enviroment.init();

var urlConnection = require('./lib/conf/db').url;
var mongoose = require('mongoose');
var app = require('./lib/app');

mongoose.connect(urlConnection, function (err, res) {
  if (err) {
     console.log('Error connecting to DB: ' + err);
     return;
  }
  app.listen(process.env.PORT, process.env.IP, function () {
    console.log('Server running at http://' +
      process.env.IP + ":" +
      process.env.PORT);
  });
});

// expose for testing
module.exports = app;
