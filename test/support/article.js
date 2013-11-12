var Article = function () {
  this.title = '';
  this.author = '';
  this.created = new Date();
  this.slug = '';
  this.category = '';
  this.abstract = '';
  this.content = '';
  this.tags = [''];
  this.comments = [{}];
};

Article.prototype.save = function (callback) {
  callback(null);
};

// Static methods
// ----------------------------------------------

Article.one = true;

Article.ok = function () {
  this.behavior = 1;
  return this;
};

Article.ko = function () {
  this.behavior = -1;
  return this;
};

Article.empty = function () {
  this.behavior = 0;
  return this;
};

Article.findOne = function () {
  this.one = true;
  return this;
};

Article.find = function () {
  this.one = false;
  return this;
};

Article.select = function () {
  return this;
};

Article.sort = function () {
  return this;
};

Article.skip = function () {
  return this;
};

Article.limit = function () {
  return this;
};

Article.exec = function (callback) {
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

Article.count = function (callback) {
  if(this.behavior > 0) {
    callback(null, 1);
  } else if (this.behavior === 0) {
    callback(null, 0);
  } else if (this.behavior < 0) {
    callback(new Error(), null);
  }
};

Article.categoriesCount = Article.tagsCount = Article.count;

module.exports = Article;
