'use strict';

var developmentConfig = {
  db: {
    options: {
      server: {
        socketOptions: {
          connectTimeoutMS: 5000
        }
      },
      replset: {
        socketOptions: {
          connectTimeoutMS: 5000
        }
      }
    }

  }
};

module.exports = developmentConfig;
