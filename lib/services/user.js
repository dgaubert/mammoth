var userService = function userService(User) {

  var service = {
    
    //
    findAll: function findAll(callback) {
      User
        .find()
        .exec(callback);
    },

    //
    findByUsername: function findByUsername(username, callback) {
      User
        .findOne({
          username: username
        })
        .exec(callback);
    }
  };

  return service;
};

module.exports = userService;
