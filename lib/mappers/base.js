'use strict';

var Sanitizer = require('sanitizer');

var BaseMapper = {

  sanitize: function (data) {
    Object.keys(data)
      .forEach(function (prop) {
        data[prop] = Sanitizer.sanitize(data[prop]);
      });

    return data;
  },

  map: function (data) {
    return this.sanitize(data);
  }
};

module.exports = BaseMapper;
