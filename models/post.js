// Schema for post model
var Schema = require('mongoose').Schema

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
    , comments: [
        {
            author: String
          , mail: String
          , created: Date
          , comment: String         
        }
      ]
    , commentsCount: Number
  },
  { 
    collection: 'blog'
  }
);

// Indexes
postSchema.set('autoIndex', true); // False in production
postSchema.index({slug: 1},{unique: true});

module.exports = postSchema;
