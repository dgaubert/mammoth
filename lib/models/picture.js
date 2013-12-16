var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition
var pictureSchema = new Schema({
      filename: String,
      metadata: Object
    }, {
      collection: 'pictures.files'
    });

module.exports = mongoose.model('Picture', pictureSchema);
