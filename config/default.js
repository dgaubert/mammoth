'use strict';

var defaultConfig = {
  server: {
    name: 'mammoth',
    host: 'localhost',
    port: 3000
  },
  db: {
    uri: process.env.MONGO_URL, //'mongodb://localhost/mammot',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1,
          connectTimeoutMS: 30000
        }
      },
      replset: {
        socketOptions: {
          keepAlive: 1,
          connectTimeoutMS: 30000
        }
      }
    }
  },
  logger: {
    category: 'application',
    transports: {
      console: {
        level: 'debug',
        colorize: true,
        timestamp: true
      }
    }
  },
  uploadDir: process.env.UPLOAD_DIR
};

module.exports = defaultConfig;
