'use strict';

var di = require('di');
var _ = require('lodash');
var Article = require('../models/article');

var ArticleDao = function ArticleDao(articleModel) {
  this.articleModel = articleModel;

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

ArticleDao.prototype = {

  // public

  'find': function find(callback) {
    this.articleModel
      .find()
      .select()
      .sort({
        created:-1
      })
      .exec(callback);
  },

  'findPublished': function findPublished(callback) {
    this.articleModel
      .find({
        published: true
      })
      .sort({
        created:-1
      })
      .exec(callback);
  },

  'findBySlug': function findBySlug(slug, callback) {
    this.articleModel
      .findOne({
        slug: slug
      })
      .exec(callback);
  },

  'findPublishedByCategoryOrTag': function findPublishedByCategoryOrTag(category, tag, page, callback) {
    var filter = {
      'published': true
    };

    if (category) {
      filter.category = category;
    } else if (tag) {
      filter.tags = {$in: tag};
    }

    this.articleModel
      .find(filter)
      .sort({
        created: -1
      })
      .skip(page * 10)
      .limit((page * 10) + 10)
      .exec(callback);
  },

  'countPublishedByCategoryOrTag': function countPublishedByCategoryOrTag(category, tag, callback) {
    var filter = {
      'published': true
    };

    if (category) {
      filter.category = category;
    } else if (tag) {
      filter.tags = {$in: tag};
    }

    this.articleModel
      .find(filter)
      .count(callback);
  },

  'findLastThree': function findLastThree(callback) {
    this.articleModel
      .find({
        published: true
      })
      .sort({
        created: -1
      })
      .limit(3)
      .exec(callback);
  },

  'findByCategory': function findByCategory(category, callback) {
    this.articleModel
      .find({
        published: true,
        category: category
      })
      .exec(callback);
  },

  'findLast': function findLast(callback) {

    this.articleModel
      .find({
        published: true
      })
      .sort({
        created: -1
      })
      .limit(1)
      .exec(callback);
  },

  'countCategories': function countCategories(callback) {
    this.articleModel
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
  },

  'countTags': function countTags(callback) {
    this.articleModel
      .mapReduce({
        map: function map() {
          var index;
          for (index in this.tags) {
            if (this.tags.hasOwnProperty(index)) {
              emit(this.tags[index], 1);
            }
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
  }
};

di.annotate(ArticleDao, new di.Inject(Article));

module.exports = ArticleDao;
