function userService(User) {

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

  return {
    'find': find,
    'findByUsername': findByUsername
  };
}

module.exports = userService;
