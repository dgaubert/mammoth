#!/bin/env node

'use strict';

// set openshift enviroment
require('./openshift');

var cluster = require('cluster');
var os = require('os');
var app = require('./lib/app');

if (process.env.NODE_ENV === 'production' && cluster.isMaster) {
  var cpuCount = os.cpus().length;

  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', function () {
    cluster.fork();
  });

} else {
  app.start();
}
