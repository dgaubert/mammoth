'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requiredMsg = '{PATH} es requerido!';
var matchMsg = 'El valor de {PATH} no es válido';

// schema definition
var userSchema = new Schema({
  username: {
    type: String,
    required: requiredMsg,
    match: [/^[-.\w]{2,100}$/, matchMsg],
    trim: true
  },
  hash: String,
  salt: String
}, {
  collection: 'user'
});

// indexes
userSchema.set('autoIndex', false);
userSchema.index({username: 1}, {unique: true});

module.exports = mongoose.model('User', userSchema);
