var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Comment
var commentary = new Schema({
  author: {
    type: String,
    required: true,
    match: /^[ÑñáéíóúüÁÉÍÓÚ\w\s]{2,100}$/,
    trim: true
  },
  mail: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/,
    trim: true
  },
  created: {
    type: Date,
    default: new Date()
  },
  comment: {
    type: String,
    required: true,
    trim: true
  }
});

// Article
var articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    match: /^(.){2,100}$/,
    trim: true
  },
  author: {
    type: String,
    required: true,
    match: /^(.){2,100}$/,
    trim: true
  },
  created: {
    type: Date,
    default: new Date()
  },
  slug: {
    type: String,
    required: true,
    match: /^[-\w]{2,100}$/,
    trim: true
  },
  category: {
    type: String,
    required: true,
    match: /^[ÑñáéíóúüÁÉÍÓÚ\w\s]{2,30}$/,
    trim: true
  },
  abstract: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    required: true,
    match: /^[ÑñáéíóúüÁÉÍÓÚ\w\s]{2,30}$/,
    trim: true
  }],
  comments: [commentary],
  published: {
    type: Boolean,
    default: false
  }
}, {
  collection: 'blog'
});

// retrieve the number the comments of the article
articleSchema.virtual('commentCounter').get(function getDone() {
  return this.comments.length;
});

// retrieve the number of items of each category
articleSchema.statics.countCategories = function countCategories(callback) {
  this.mapReduce({
      map: function map() {
        emit(this.category, 1);
      },
      reduce: function reduce(i, categories) {
        return categories.length;
      },
      query: {
        'published': true
      }
    }, callback);
};

// retrieve the number of items of each tag
articleSchema.statics.countTags = function countTags(callback) {
  this.mapReduce({
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
    }, callback);
};

// indexes
articleSchema.set('autoIndex', false);
articleSchema.index({slug: 1}, {unique: true});
articleSchema.index({created: -1});

module.exports = mongoose.model('Article', articleSchema);
