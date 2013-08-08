#!/bin/env node

// Enviroment
require('./lib/conf/env');

// Server
require('./lib/app').listen(process.env.PORT, process.env.IP, function () {
  console.log('Server running at http://' + process.env.IP + ":" + process.env.PORT);
});