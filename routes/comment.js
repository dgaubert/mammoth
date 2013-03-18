var mongoose = require('mongoose'), // DB driver
    db = mongoose.createConnection('mongodb://localhost/mammoth'), // DB conexion
    articleSchema = require('../models/article'), // Load schema
    Article = db.model('Article', articleSchema); // Load model

exports.newComment = function (req, res, next) {
  var slug = req.params.slug || '';
  var comment = {
    author: req.body.name,
    mail: req.body.mail,
    created: new Date(),
    comment: req.body.comment.replace(/\n/g, '<br/>')
  };
  Article.findOne({'slug': slug}, function (err, article) {
    if (err) {
      next();
    } else {
      article.comments.push(comment);
      article.save(function (err) {
        if (err) {
          next(new Error('Save comment fails'));
        }
        res.redirect('/blog/' + slug + '#lastCommnent');
      });
    }
  });
};
