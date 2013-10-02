/**
 * Schema for summary model
 */
var mongoose = require('mongoose'), // db driver
    Schema = mongoose.Schema,
    db = mongoose.createConnection(require('../conf/db')); // db connection

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

module.exports = db.model('User', userSchema);