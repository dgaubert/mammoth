'use strict';

if (process.env.OPENSHIFT_NODEJS_IP) {
  process.env.NODE_ENV = 'production';
} else {
  process.env.NODE_ENV = 'development';
}

process.env.ROOT_URL = process.env.OPENSHIFT_APP_DNS || 'localhost';
process.env.APP_NAME = process.env.OPENSHIFT_APP_NAME || 'mammoth';
process.env.PORT = process.env.OPENSHIFT_INTERNAL_PORT || 3000;
process.env.IP = process.env.OPENSHIFT_INTERNAL_IP || '0.0.0.0';

// setup DB configuration
process.env.MONGO_USER = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
process.env.MONGO_PASSWORD = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
process.env.MONGO_URL = 'moongodb://';

// compose mongo url in production
if (process.env.MONGO_USER !== 'undefined' && process.env.MONGO_PASSWORD !== 'undefined') {
  process.env.MONGO_URL = process.env.MONGO_URL +
                          process.env.MONGO_USER + ':' +
                          process.env.MONGO_PASSWORD + '@';
}

process.env.MONGO_HOST = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
process.env.MONGO_PORT = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';
process.env.MONGO_URL = process.env.MONGO_URL + process.env.MONGO_HOST + ':' +
                        process.env.MONGO_PORT + '/' +
                        process.env.APP_NAME;

process.env.LOG_DIR = process.env.OPENSHIFT_LOG_DIR || './';
