'use strict';

var productionConfig = {
  server: {
    host: process.env.ROOT_URL,
    port: process.env.PORT
  },
  db: {
    uri: process.env.MONGO_URL
  },
  logger: {
    category: process.env.APP_NAME,
    transports: {
      file: {
        level: 'info',
        filename: process.env.LOG_DIR + 'mammoth.log',
        handleExceptions: true,
        json: true,
        maxsize: 10485760, //10MB
        maxFiles: 10,
        colorize: false
      }
    }
  }
};

module.exports = productionConfig;
