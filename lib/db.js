var mongoose = require( 'mongoose' );
var config = require('config');
var logger = require('./logger');

var db = {
  connect: function connect() {

    // create the database connection
    mongoose.connect(config.db.uri, config.db.options);

    mongoose.connection.on('connected', function onConnected() {
      logger.info('Database connection open to ' + config.db.uri);
    });

    mongoose.connection.on('error', function onConnectionError(err) {
      logger.error('Database connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
      logger.warn('Database connection disconnected');
    });

  },
  close: function(callback) {
    mongoose.connection.close(function() {
      callback();
    });
  }
};

module.exports = db;
