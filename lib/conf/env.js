/**
 * Setup env
 */
process.env.ROOT_URL = process.env.OPENSHIFT_APP_DNS || 'localhost';
process.env.APP_NAME = process.env.OPENSHIFT_APP_NAME || 'mammoth';
process.env.PORT = process.env.OPENSHIFT_INTERNAL_PORT || 8000;
process.env.IP = process.env.OPENSHIFT_INTERNAL_IP || '0.0.0.0';