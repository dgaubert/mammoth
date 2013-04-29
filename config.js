/**
 * Setup env
 */
process.env.ROOT_URL = process.env.OPENSHIFT_APP_DNS || 'localhost';
process.env.APP_NAME = process.env.OPENSHIFT_APP_NAME || 'mammoth';
process.env.PORT = process.env.OPENSHIFT_INTERNAL_PORT || 8000;
process.env.IP = process.env.OPENSHIFT_INTERNAL_IP || '0.0.0.0';

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

module.exports.dbinfo = process.env.MONGO_URL;

/**
 * Setup RSS configuration
 */
var rssinfo = {
  title: 'Blog de Daniel G. Aubert',
  description: 'Programmer',
  link: 'http://www.dgaubert.com/blog/',
  image: 'http://www.dgaubert.com/images/favicon.ico',
  copyright: 'Copyright © 2013 Daniel G. Aubert. All rights reserved',
  author: {
    name: 'Daniel G. Aubert',
    email: 'danielgarciaaubert@gmail.com',
    link: 'http://www.dgaubert.com/'
  }
};


module.exports.rssinfo = rssinfo;