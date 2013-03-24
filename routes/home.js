/**
 * Module dependencies
 */
var mongoose = require('mongoose'), // DB driver
    db = mongoose.createConnection('mongodb://localhost/mammoth'), // DB conexion
    async = require('async'), // Control flow
    summarySchema = require('../models/summary'), // Load schema
    Summary = db.model('Summary', summarySchema); // Load model

/**
 * Retrieve a home representation
 * 
 * @param  {Object}   req : request
 * @param  {Object}   res : response
 * @param  {Function} next : error handler
 * @return {Object}   view of the home page
 */
exports.getHome = function(req, res, next){
  async.parallel({
    summaries: function (callback) {
      Summary.getLast({}, callback);
    },
    categories: function (callback) {
      Summary.categoriesCount(callback);
    }
  },
  function (err, blog) {
    if (err) {
      next();
    } else {
      res.render('home', {
        title: 'Daniel García Aubert - Software Engineer',
        section:'home',
        summaries: blog.summaries,
        categories: blog.categories[0]
      });
    }
  });
};