/**
 * Schema for post model
 */
var mongoose = require('mongoose'), // db driver
    Schema = mongoose.Schema;

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

/**
 * Retrieve the number the comments of the article
 *  
 * @return {Object}   number of the comments
 */
articleSchema.virtual('commentCounter').get(function () {
  return this.comments.length;
});

/**
 * Retrieve the number of items of each category
 * 
 * @param  {Function} callback : callback
 * @return {[type]}   list of each category with its number of occurences
 */
articleSchema.statics.categoriesCount = function (callback) {
  this.mapReduce({
      map: function () {
        emit(this.category, 1);
      },
      reduce: function (i, categories) {
        return categories.length;
      },
      query: {
        'published': true
      }
    }, callback);
};

/**
 * Retrieve the number of items of each tag
 * 
 * @param  {Function} callback : callback
 * @return {Object}   list of each tag with its number of occurences
 */
articleSchema.statics.tagsCount = function (callback) {
  this.mapReduce({
      map: function () {
        var index;
        for (index in this.tags) {
            emit(this.tags[index], 1);
        }
      },
      reduce: function (i, tags) {
        return tags.length;
      },
      query: {
        'published': true
      }
    }, callback);
};

// Indexes
articleSchema.set('autoIndex', false);
articleSchema.index({slug: 1}, {unique: true});
articleSchema.index({created: -1});

// Exports
module.exports = mongoose.model('Article', articleSchema);
