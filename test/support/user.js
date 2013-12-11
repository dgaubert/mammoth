var User = function User () {
  this.username = 'test';
  this.salt = '';
  this.hash = '';
};

User.prototype.save = function (callback) {
  callback(null);
};

module.exports = User;
