/**
 * Module dependencies
 */
var async = require('async'), // Control flow
    Summary = require('../models/summary'); // db model & service

/**
 * Retrieve categories and tags of the articles with the weight of each one
 * 
 * @param  {Object}   req : request
 * @param  {Object}   res : response
 * @param  {Function} next : error handler
 * @return {Json}     words with its weight  
 */
exports.getWords = function (req, res, next) {
  async.parallel({
    categories: function (callback) {
      Summary.categoriesCount(callback);
    },
    tags: function (callback) {
      Summary.tagsCount(callback);
    }
  },
  function (err, words) {
    var i,
        categories = words.categories[0],
        tags = words.tags[0],
        cloud = [],
        body;
    if (err) {
      next();
    } else {
      for (i = 0; i < categories.length; i++) {
        cloud.push({text: categories[i]._id,
          weight: categories[i].value,
          link: '/blog/category/' + categories[i]._id
        });
      }
      for (i = 0; i < tags.length; i++) {
        cloud.push({text: tags[i]._id,
          weight: tags[i].value,
          link: '/blog/tag/' + tags[i]._id
        });
      }
      body = JSON.stringify(cloud);
      res.writeHead(200, { 
        'Content-Type': 'application/json',
        'Content-Length': body.length
      });
      res.end(body);
    }
  });
};