var mongoose = require('mongoose') // DB driver
  , db = mongoose.createConnection('mongodb://localhost/mammoth') // DB conexion
  , async = require('async') // Control flow
  , summarySchema = require('../models/summary') // Load schema
  , Summary = db.model('Summary', summarySchema); // Load model

exports.view = function(req, res){
  async.parallel({
    summaries: function (callback) {
      Summary.find({})
        .sort({created: 1})
        .limit(1)
        .execFind(callback);
    },
    categories: function (callback) {
      Summary.categoriesCount(callback);
    },
  },
  function (err, blog) {
    if (err) {
      console.log(err);
    } else {
      res.render('home', { 
          title: 'Daniel García Aubert - Programmer'
        , section:'home'
        , summaries: blog.summaries
        , categories: blog.categories[0]
      });
    }
  });
};
