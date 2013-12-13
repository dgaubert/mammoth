module.exports = function (User) {

  return {
    
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
};