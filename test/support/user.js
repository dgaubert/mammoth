var User = function User () {
  this.salt = '';
  this.hash = '';
};

User.prototype.save = function (callback) {
  callback(null);
};

// Static methods
// ----------------------------------------------

User.one = true;

User.ok = function () {
  this.behavior = 1;
  return this;
};

User.ko = function () {
  this.behavior = -1;
  return this;
};

User.empty = function () {
  this.behavior = 0;
  return this;
};

User.findOne = function () {
  this.one = true;
  return this;
};

User.find = function () {
  this.one = false;
  return this;
};

User.select = function () {
  return this;
};

User.sort = function () {
  return this;
};

User.skip = function () {
  return this;
};

User.limit = function () {
  return this;
};

User.exec = function (callback) {
  if(this.behavior > 0) {
    if (this.one) {
      callback(null, new this());
    } else {
      callback(null, [new this()]);
    }
  } else if (this.behavior === 0) {
    if (this.one) {
      callback(null, {});
    } else {
      callback(null, [{}]);
    }
  } else if (this.behavior < 0) {
    callback(new Error(), null);
  }
};

User.count = function (callback) {
  if(this.behavior > 0) {
    callback(null, 1);
  } else if (this.behavior === 0) {
    callback(null, 0);
  } else if (this.behavior < 0) {
    callback(new Error(), null);
  }
};

User.categoriesCount = User.tagsCount = User.count;

module.exports = User;

