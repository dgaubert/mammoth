var init = function init () {
  // initialize enviroment
  if (!process.env.OPENSHIFT_NODEJS_IP) {
    process.env.DEVELOPMENT = true;
  }

  process.env.ROOT_URL = process.env.OPENSHIFT_APP_DNS || 'localhost';
  process.env.APP_NAME = process.env.OPENSHIFT_APP_NAME || 'mammoth';
  process.env.PORT = process.env.OPENSHIFT_INTERNAL_PORT || 8000;
  process.env.IP = process.env.OPENSHIFT_INTERNAL_IP || '0.0.0.0';
};

module.exports.init = init;
