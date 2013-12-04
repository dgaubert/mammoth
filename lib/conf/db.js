/**
 * Setup DB configuration
 */
process.env.MONGO_USER = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
process.env.MONGO_PASSWORD = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
process.env.MONGO_URL = 'moongodb://';
// Production enviroment
if (process.env.MONGO_USER !== 'undefined' && process.env.MONGO_PASSWORD !== 'undefined') {
  process.env.MONGO_URL = process.env.MONGO_URL + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@';
}
process.env.MONGO_HOST = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
process.env.MONGO_PORT = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';
process.env.MONGO_URL = process.env.MONGO_URL + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/' + process.env.APP_NAME;

// Grid FS
process.env.MONGO_NODE_DRIVER_HOST = process.env.MONGO_HOST;
process.env.MONGO_NODE_DRIVER_PORT = process.env.MONGO_PORT;

module.exports = process.env.MONGO_URL;
