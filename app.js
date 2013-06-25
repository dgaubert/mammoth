#!/bin/env node

var app = require('./server');

/**
 * Server
 */
app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Server running at http://' + process.env.IP + ":" + process.env.PORT);
});