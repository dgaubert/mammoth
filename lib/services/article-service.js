var Article = require('../models/article');

var findAll = function(callback) {
  Article
    .find()
    .select({
      title: 1,
      slug: 1,
      created: 1
    })
    .sort({
      created:-1
    })
    .exec(callback);
};

module.exports.findAll = findAll;

var findAllPublished = function (callback) {
  Article
    .find({
      published: true
    })
    .sort({
      created:-1
    })
    .exec(callback);
};

module.exports.findAllPublished = findAllPublished;

var findBySlug = function (slug, callback) {
  Article
    .findOne({
      slug: slug
    })
    .exec(callback);
};

module.exports.findBySlug = findBySlug;

var findPublishedByCategoryOrTag = function (category, tag, page, callback) {
  var filter = {};

  filter.published = true;
  if (category) {
    filter.category = category;
  }
  if (tag) {
    filter.tag = tag;
  }

  console.log(filter);

  Article
    .find(filter)
    .sort({
      created: -1
    })
    .skip(page * 10)
    .limit((page * 10) + 10)
    .exec(callback);
};

module.exports.findPublishedByCategoryOrTag = findPublishedByCategoryOrTag;

var countPublishedByCategoryOrTag = function (category, tag, callback) {
  var filter = {};

  filter.published = true;
  if (category) {
    filter.category = category;
  }
  if (tag) {
    filter.tag = tag;
  }

  Article
    .find(filter)
    .count(callback);
};

module.exports.countPublishedByCategoryOrTag = countPublishedByCategoryOrTag;

var findLastThree = function (callback) {
  Article
    .find({
      published: true
    })
    .sort({
      created: -1
    })
    .limit(3)
    .exec(callback);
};

module.exports.findLastThree = findLastThree;

var findByCategory = function (category, callback) {
  Article
    .find({
      published: true,
      category: category
    })
    .exec(callback);
};

module.exports.findByCategory = findByCategory;

var findLast = function (callback) {
  Article
    .find({
      published: true
    })
    .sort({
      created: -1
    })
    .limit(1)
    .exec(callback);
};

module.exports.findLast = findLast;

var categoriesCount = function (callback) {
  Article.categoriesCount(callback);
};

module.exports.categoriesCount = categoriesCount;

var tagsCount = function (callback) {
  Article.tagsCount(callback);
};

module.exports.tagsCount = tagsCount;
