var User = function User () {
  this.username = 'username';
  this.salt = 'salt';
  this.hash = 'hash';
};

User.prototype.save = function (callback) {
  callback(null);
};

module.exports = User;
