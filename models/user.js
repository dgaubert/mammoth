/**
 * Schema for summary model
 */
var Schema = require('mongoose').Schema;

// Schema definition
var userSchema = new Schema(
  {
    username: String,
    hash: String,
    salt: String
  },
  {
    collection: 'user'
  }
);
module.exports = userSchema;