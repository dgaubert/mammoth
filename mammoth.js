#!/bin/env node

// Setup the enviroment (Production or development enviroments)
require('./lib/conf/env');

// For testing purpose it's needed to export the application
var mongoose = require('mongoose'),
    app = module.exports = require('./lib/app');

mongoose.connect(require('./lib/conf/db'), function (err, res) {
  if (err) {
    console.log('ERROR: connecting to DB. ' + err);
  } else {
    // Server
    app.listen(process.env.PORT, process.env.IP, function () {
      console.log('Server running at http://' + process.env.IP + ":" + process.env.PORT);
    });
  }
});

