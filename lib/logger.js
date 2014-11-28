'use strict';

var winston = require('winston');
var config = require('config');

winston.emitErrs = false;
winston.loggers.add(config.logger.name, config.logger.transports);

module.exports = winston.loggers.get(config.logger.name);
