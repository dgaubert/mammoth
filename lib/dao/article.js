/* jslint node: true */
'use strict';

var _ = require('lodash');

var ArticleDao = function ArticleDao(ArticleModel) {
  this.ArticleModel = ArticleModel;

  _.bindAll(
    this,
    'find',
    'findPublished',
    'findBySlug',
    'findPublishedByCategoryOrTag',
    'countPublishedByCategoryOrTag',
    'findLastThree',
    'findByCategory',
    'findLast',
    'countCategories',
    'countTags'
  );
};

// public

ArticleDao.prototype.find = function find(callback) {
  this.ArticleModel
    .find()
    .select()
    .sort({
      created:-1
    })
    .exec(callback);
};

ArticleDao.prototype.findPublished = function findPublished(callback) {
  this.ArticleModel
    .find({
      published: true
    })
    .sort({
      created:-1
    })
    .exec(callback);
};

ArticleDao.prototype.findBySlug = function findBySlug(slug, callback) {
  this.ArticleModel
    .findOne({
      slug: slug
    })
    .exec(callback);
};

ArticleDao.prototype.findPublishedByCategoryOrTag = function findPublishedByCategoryOrTag(category, tag, page, callback) {
  var filter = {
    'published': true
  };

  if (category) {
    filter.category = category;
  } else if (tag) {
    filter.tags = {$in: tag};
  }

  this.ArticleModel
    .find(filter)
    .sort({
      created: -1
    })
    .skip(page * 10)
    .limit((page * 10) + 10)
    .exec(callback);
};

ArticleDao.prototype.countPublishedByCategoryOrTag = function countPublishedByCategoryOrTag(category, tag, callback) {
  var filter = {
    'published': true
  };

  if (category) {
    filter.category = category;
  } else if (tag) {
    filter.tags = {$in: tag};
  }

  this.ArticleModel
    .find(filter)
    .count(callback);
};

ArticleDao.prototype.findLastThree = function findLastThree(callback) {
  this.ArticleModel
    .find({
      published: true
    })
    .sort({
      created: -1
    })
    .limit(3)
    .exec(callback);
};

ArticleDao.prototype.findByCategory = function findByCategory(category, callback) {
  this.ArticleModel
    .find({
      published: true,
      category: category
    })
    .exec(callback);
};

ArticleDao.prototype.findLast = function findLast(callback) {
  this.ArticleModel
    .find({
      published: true
    })
    .sort({
      created: -1
    })
    .limit(1)
    .exec(callback);
};

ArticleDao.prototype.countCategories = function countCategories(callback) {
  /* global emit:true */
  this.ArticleModel
    .mapReduce({
      map: function map() {
        emit(this.category, 1);
      },
      reduce: function reduce(i, categories) {
        return categories.length;
      },
      query: {
        'published': true
      }
    },
    callback);
};

ArticleDao.prototype.countTags = function countTags(callback) {
  /* global emit:true */
  this.ArticleModel
    .mapReduce({
      map: function map() {
        var index;
        for (index in this.tags) {
          emit(this.tags[index], 1);
        }
      },
      reduce: function reduce(i, tags) {
        return tags.length;
      },
      query: {
        'published': true
      }
    },
    callback);
};

module.exports = ArticleDao;
