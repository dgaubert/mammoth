var User = require('../models/user');

var findAll = function (callback) {
  User
    .find()
    .exec(callback);
};

module.exports.findAll = findAll;

var findByUsername = function (username, callback) {
  User
    .findOne({
      username: username
    })
    .exec(callback);
};

module.exports.findByUsername = findByUsername;
