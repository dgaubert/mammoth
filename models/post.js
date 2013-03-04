// Schema for post model
var Schema = require('mongoose').Schema

var commentary = new Schema(
  {
      author: String
    , mail: String
    , created: Date
    , comment: String
  }
);

var postSchema = new Schema(
  {
      title: String
    , author: String
    , created: Date
    , slug: String
    , category: String
    , abstract: String
    , content: String
    , tags: [String]
    , comments: [commentary]
  },
  { 
    collection: 'blog'
  }
);

// Indexes
postSchema.set('autoIndex', true); // False in production
postSchema.index({slug: 1},{unique: true});

// Exports
module.exports = postSchema;
