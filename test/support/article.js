var Article = function () {
  this.title = 'title';
  this.author = 'author';
  this.created = new Date();
  this.slug = 'slug';
  this.category = 'category';
  this.abstract = 'abstract';
  this.content = 'content';
  this.tags = ['tag1', 'tag2'];
  this.comments = [{}];
};

Article.prototype.save = function (callback) {
  callback(null);
};

module.exports = Article;
