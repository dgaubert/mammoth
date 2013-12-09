/**
 * Schema for summary model
 */
var mongoose = require('mongoose'), // db driver
    Schema = mongoose.Schema;

// Schema definition
var pictureSchema = new Schema({
      filename: String,
      metadata: Object
    }, {
      collection: 'pictures.files'
    });

module.exports = mongoose.model('Picture', pictureSchema);