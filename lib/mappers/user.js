'use strict';

var _ = require('lodash');
var BaseMapper = require('./base');

function UserMapper() {}

UserMapper.prototype = _.create(BaseMapper, {

  constructor: UserMapper

});

module.exports = UserMapper;
