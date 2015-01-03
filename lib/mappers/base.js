'use strict';

var sanitize = require('sanitizer').sanitize;

function BaseMapper() {
}

BaseMapper.prototype = {
  sanitize: function (data) {
    Object.keys(data).forEach(function (prop) {
      data[prop] = sanitize(data[prop]);
    });

    return data;
  },

  map: function (data) {
    return this.sanitize(data);
  }
};

module.exports = BaseMapper;
