/* jslint node: true */
'use strict';

function UserService(User) {

  // public

  function find(callback) {
    User
      .find()
      .exec(callback);
  }

  function findByUsername(username, callback) {
    User
      .findOne({
        username: username
      })
      .exec(callback);
  }

  // expose

  return {
    'find': find,
    'findByUsername': findByUsername
  };
}

module.exports = UserService;
