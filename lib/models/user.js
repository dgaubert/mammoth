var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema definition
var userSchema = new Schema({
  username: String,
  hash: String,
  salt: String
}, {
  collection: 'user'
});

// indexes
userSchema.set('autoIndex', false);
userSchema.index({username: 1}, {unique: true});

module.exports = mongoose.model('User', userSchema);
