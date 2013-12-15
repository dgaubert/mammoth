module.exports = function (User) {

  var userService = {
    
    findAll: function (callback) {
      User
        .find()
        .exec(callback);
    },

    findByUsername: function (username, callback) {
      User
        .findOne({
          username: username
        })
        .exec(callback);
    }
  };

  return userService;
};