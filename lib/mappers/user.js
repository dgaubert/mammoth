/* jslint node: true */
'use strict';

var sanitize = require('sanitizer').sanitize;

var userMapper = {
  map: function map(user, data, salt, hash) {
    user.username = data.username;
    user.salt = salt;
    user.hash = hash;

    return user;
  },

  sanitizeData: function sanitizeData(data) {
    return {
      username: sanitize(data.username),
      password: sanitize(data.password)
    };
  }

};

module.exports = userMapper;
