/**
 * Schema for post model
 */
var mongoose = require('mongoose'), // db driver
    Schema = mongoose.Schema,
    db = mongoose.createConnection(require('../conf/db')); // db connection

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
  comments: [commentary]
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
 * Static methods
 */

/**
 * Retrieve a paginated list of articles
 * 
 * @param  {[type]}   filter
 * @param  {[type]}   page
 * @param  {Function} cb : callback
 * @return {[type]}   paginated list of articles 
 */
articleSchema.statics.findRange = function (filter, page, cb) {
  this.find(filter)
      .sort({created: -1})
      .skip(page * 10)
      .limit((page * 10) + 10)
      .execFind(cb);
};

/**
 * Retrive the number of articles
 * 
 * @param  {[type]}   filter
 * @param  {Function} cb : callback
 * @return {Integer}  number of articles
 */
articleSchema.statics.count = function (filter, cb) {
  this.find(filter).count(cb);
};

/**
 * Retrieve a list of catergories
 * 
 * @param  {[type]}   filter
 * @param  {Function} cb : callback
 * @return {[type]}   list of distinct categories
 */
articleSchema.statics.categories = function (filter, cb) {
  this.find(filter, {'_id': 0, 'category': 1}).distinct('category', cb);
};

/**
 * Retrieve a list of tags
 * 
 * @param  {[type]}   filter
 * @param  {Function} cb : callback
 * @return {[type]}   list of tags
 */
articleSchema.statics.titles = function (filter, cb) {
  this.find(filter, {'_id': 0, 'title': 1, 'slug': 1}, cb);
};

/**
 * Retrieve a tag list with distint items 
 * 
 * @param  {[type]}   filter
 * @param  {Function} cb : callback
 * @return {[type]}   list of distinct tags
 */
articleSchema.statics.tags = function (filter, cb) {
  this.find(filter, {'_id': 0, 'tags': 1}).distinct('tags', cb);
};

/**
 * Retrieve the number of items of each category
 * 
 * @param  {Function} cb : callback
 * @return {[type]}   list of each category with its number of occurences
 */
articleSchema.statics.categoriesCount = function (cb) {
  this.mapReduce({
      map: function () {
        emit(this.category, 1);
      },
      reduce: function (i, categories) {
        return categories.length;
      }
    }, cb);
};

/**
 * Retrieve the number of items of each tag
 * 
 * @param  {Function} cb : callback
 * @return {Object}   list of each tag with its number of occurences
 */
articleSchema.statics.tagsCount = function (cb) {
  this.mapReduce({
      map: function () {
        var index;
        for (index in this.tags) {
            emit(this.tags[index], 1);
        }
      },
      reduce: function (i, tags) {
        return tags.length;
      }
    }, cb);
};

/**
 * Retrieve the last article created
 * 
 * @param  {Object}   filter
 * @param  {Function} cb : callback
 * @return {Object}   last article created 
 */
articleSchema.statics.getLast = function (filter, cb) {
  this.find(filter)
      .sort({created: -1})
      .limit(1)
      .execFind(cb);
};


/**
 * Retrieve all articles odered
 * 
 * @param  {[type]}   filter
 * @param  {[type]}   page
 * @param  {Function} cb : callback
 * @return {[type]}   paginated list of articles 
 */
articleSchema.statics.findAll = function (filter, fields, sort, cb) {
  this.find(filter, fields)
      .sort(sort)
      .exec(cb);
};


// Indexes
articleSchema.set('autoIndex', false); // False in production
articleSchema.index({slug: 1},{unique: true});
articleSchema.index({created: -1});

// Exports
module.exports = db.model('Article', articleSchema);
