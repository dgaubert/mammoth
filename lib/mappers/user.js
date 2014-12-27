'use strict';

var sanitize = require('sanitizer').sanitize;

function UserMapper() {
}

UserMapper.prototype = {
  map: function (user, data, salt, hash) {
    user.username = data.username;
    user.salt = salt;
    user.hash = hash;

    return user;
  },

  sanitizeData: function (data) {
    return {
      username: sanitize(data.username),
      password: sanitize(data.password)
    };
  }
};

module.exports = UserMapper;
