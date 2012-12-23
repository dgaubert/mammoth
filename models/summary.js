// Schema for summary model
var Schema = require('mongoose').Schema;

// Schema definition
var summarySchema = new Schema({
      title: String
    , author: String
    , created: Date
    , slug: String
    , category: String
    , abstract: String
    , tags: [String]
  },
  { 
    collection: 'blog'
  });

// Static methods

// Find summaries between two values (start & end)
summarySchema.statics.findRange = function (filter, page, cb) {
  this.find(filter)
      .sort({created: 1})
      .skip(page * 10)
      .limit((page * 10) + 10)
      .execFind(cb);
}

summarySchema.statics.count = function (filter, cb) {
  this.find(filter).count(cb);
}

summarySchema.statics.titles = function (filter, cb) {
  this.find(filter, {'_id': 0, 'title': 1}, cb);
}

summarySchema.statics.categories = function (filter, cb) {
  this.find(filter, {'_id': 0, 'category': 1}).distinct('category', cb);
}

summarySchema.statics.tags = function (filter, cb) {
  this.find(filter, {'_id': 0, 'tags': 1}).distinct('tags', cb);
}


// Indexes
summarySchema.set('autoIndex', true); // False in production
summarySchema.index({slug: 1},{unique: true});
summarySchema.index({created: -1});

module.exports = summarySchema;
