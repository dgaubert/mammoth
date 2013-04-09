/**
 * Schema for post model
 */
var Schema = require('mongoose').Schema;

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
},
{
  collection: 'blog'
});

// Indexes
articleSchema.set('autoIndex', true); // False in production
articleSchema.index({slug: 1},{unique: true});

// Exports
module.exports = articleSchema;