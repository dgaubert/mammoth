/**
 * Schema for summary model
 */
var mongoose = require('mongoose'), // db driver
    Schema = mongoose.Schema;

// Schema definition
var userSchema = new Schema({
      username: String,
      hash: String,
      salt: String
    }, {
      collection: 'user'
    });

// Indexes
userSchema.set('autoIndex', false);
userSchema.index({username: 1},{unique: true});

module.exports = mongoose.model('User', userSchema);
