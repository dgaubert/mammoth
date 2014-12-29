'use strict';

var di = require('di');
var _ = require('lodash');
var BaseDao = require('./base');
var Article = require('../models/article');

function ArticleDao(articleModel) {
  this.Model = articleModel;
}

ArticleDao.prototype = _.create(BaseDao, {

  _buildFilter: function (category, tags) {
    var filter = { published: true };

    if (category) {
      filter.category = category;
    }
    if (tags) {
      filter.tags = { $in: tags };
    }

    return filter;
  },

  findPublished: function () {
    var filter = { published: true };
    var options = { sort: { created:-1 } };

    return this.find(filter, null, options);
  },

  findBySlug: function (slug) {
    return this.findOne({ slug: slug })
      .then(function (article) {
        if (!article) {
          throw new Error('Article not found');
        }
        return article;
      });
  },

  findPublishedByCategoryOrTag: function (category, tags, page) {
    var filter = this._buildFilter(category, tags);
    var options = {
      sort: { created: -1 },
      skip: page * 10,
      limit: (page * 10) + 10
    };

    return this.find(filter, null, options)
      .then(function (articles) {
        if (!articles.length) {
          throw new Error('Articles not found');
        }
        return articles;
      });
  },

  countPublishedByCategoryOrTag: function (category, tags) {
    var filter = this._buildFilter(category, tags);
    return this.count(filter);
  },

  findLastThree: function () {
    var filter = this._buildFilter();
    var options = {
      sort: { created: -1 },
      limit: 3
    };

    return this.find(filter, null, options);
  },

  findByCategory: function (category) {
    var filter = this._buildFilter(category);
    var options = {
      sort: { created: -1 }
    };

    return this.find(filter, null, options);
  },

  findLast: function () {
    var filter = this._buildFilter();
    var options = {
      sort: { created: -1 },
      limit: 1
    };

    return this.find(filter, null, options);
  },

  countCategories: function () {
    return this.mapReduce({
        map: function map() {
          emit(this.category, 1);
        },
        reduce: function reduce(i, categories) {
          return categories.length;
        },
        query: {
          published: true
        }
      });
  },

  countTags: function () {
    return this.mapReduce({
        map: function map() {
          for (var index in this.tags) {
            if (this.tags.hasOwnProperty(index)) {
              emit(this.tags[index], 1);
            }
          }
        },
        reduce: function reduce(i, tags) {
          return tags.length;
        },
        query: {
          published: true
        }
      });
  },

  checkIfNotExits: function (slug) {
    return this.findOne({ slug: slug })
      .then(function (article) {
        if (article) {
          throw new Error('Article already exists');
        }
      });
  }

});

di.annotate(ArticleDao, new di.Inject(Article));

module.exports = ArticleDao;
