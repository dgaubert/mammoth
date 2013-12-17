var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Comment
var commentary = new Schema({
  author: String,
  mail: String,
  created: Date,
  comment: String
});

// Article
var articleSchema = new Schema({
  title: String,
  author: String,
  created: Date,
  slug: String,
  category: String,
  abstract: String,
  content: String,
  tags: [String],
  comments: [commentary],
  published: Boolean
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
