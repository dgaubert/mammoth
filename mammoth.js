#!/bin/env node

// Setup the enviroment (Production or development enviroments)
require('./lib/conf/env');

// For testing purpose it's needed to export the application
var app = module.exports = require('./lib/app');

// Server
app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Server running at http://' + process.env.IP + ":" + process.env.PORT);
});
