'use strict';

var base = require('./base');
var _ = require('lodash');

function UserMapper() {
}

UserMapper.prototype = _.extend(base, {});

module.exports = UserMapper;
