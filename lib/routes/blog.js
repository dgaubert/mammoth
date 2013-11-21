/**
 * Module dependencies
 */
var async = require('async'), // Control flow
    Paginator = require('../utils/paginator'), // Pagination
    parser = require('../utils/mdparser'),
    nospam = require('../utils/nospam');

module.exports = function (Article) {

  /**
   * Retrieve a blog summary
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   * @return {Object}   blog summary
   */
  this.getSummary = function (req, res, next) {
    var page = parseInt(req.params.page, 10) || 0,
        category = req.params.category,
        tag = req.params.tag,
        filter = {'published': true};

    if (category) {
      filter = {'published': true, 'category': category};
    } else if (tag) {
      filter = {'published': true, 'tags': {$in: tag}};
    }

    var tasks = {
      articles: function (callback) {
        Article.find(filter)
          .sort({created: -1})
          .skip(page * 10)
          .limit((page * 10) + 10)
          .exec(callback);
      },
      count: function (callback) {
        Article.find(filter)
          .count(callback);
      }
    };

    var done = function (err, blog) {
      if (err || blog.articles.length <= 0) {
        next();
      } else {
        res.render('blog/blog', {
          title: 'Blog - Daniel García Aubert',
          section:'blog',
          articles: parser(blog.articles),
          pagination: new Paginator(page, blog.count)
        });
      }
    };

    async.parallel(tasks, done);

  };
  
  /**
   * Retrieve the article by the slug 
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   * @return {Object}   view of the article
   */
  this.getArticle =  function (req, res, next) {
    var slug = req.params.slug || '';

    var tasks = {
      article: function (callback) {
        Article.findOne({'slug': slug})
          .exec(callback);
      },
      categories: function (callback) {
        Article.categoriesCount(callback);
      }
    };

    var done = function (err, blog) {
      if (err || !blog.article) {
        next();
      } else {
        Article.find({'published': true, 'category': blog.article.category})
          .select({'_id': -1, 'title': 1, 'slug': 1})
          .exec(function (err, similars) {
              res.render('blog/article', {
                title: blog.article.title + ' - Blog - Daniel García Aubert',
                section:'blog',
                article: parser(blog.article),
                categories: blog.categories[0],
                challenge: nospam.getChallenge(),
                similars: similars
              });
          });
      }
    };

    async.parallel(tasks, done);
  };

  /**
   * Create a comment of the article
   * 
   * @param  {Object}   req : request
   * @param  {Object}   res : response
   * @param  {Function} next : error handler
   */
  this.newComment = function (req, res, next) {
    var slug = req.params.slug || '',
        comment = {
          author: req.body.name,
          mail: req.body.mail,
          created: new Date(),
          comment: req.body.comment.replace(/\n/g, '<br/>')
        },
        answer = {
          id: req.body.challengeId,
          option: {
            value: req.body.challengeValue
          }
        };

    var done = function (err, article) {
      if (err) {
        next();
      } else {
        article.comments.push(comment);
        article.save(function (err) {
          if (err) {
            res.send(500, 'Comment not saved');
          } else {
            res.send(200, 'Comment saved!. Reloading...');
          }
        });
      }
    };

    var error = validateComment(comment, answer);

    if (error) {
      res.send(500, error);
    } else {
      Article
        .findOne({'slug': slug})
        .exec(done);
    }

  };

  var validateComment = function (comment, challenge) {
    var tags = comment.comment.match(/<(.*?)>/g),
        closed,
        tag,
        i,
        j;

    if (comment.author.match(/^[\w\s._-]+$/) === null) {
      return 'Nombre no válido';
    }

    if (comment.mail.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/) === null) {
      return 'Correo no válido';
    }

    if (!comment.comment.length) {
      return 'Escribe un comentario';
    } else if (tags !== null) {

      for (i = 0; i < tags.length; i++) {

        if (tags[i].search('<a href=') < 0 &&
            tags[i].search('</a>') < 0 &&
            tags[i].search('<code>') < 0 &&
            tags[i].search('</code>') < 0 &&
            tags[i].search('<strong>') < 0 &&
            tags[i].search('</strong') < 0 &&
            tags[i].search('<blockquote>') < 0 &&
            tags[i].search('</blockquote>') < 0 &&
            tags[i].search('<br/>') < 0) {

          return 'Etiqueta HTML ' + tags[i] + ' no válida';
        }

        if (tags[i] !== '<br/>') {
          closed = false;

          if (tags[i].search('</') < 0) {
            tag = tags[i]
              .replace('<','')
              .replace('>','');

            if (tag[0] === 'a') {
              tag = 'a';
            }

            for (j = i; j < tags.length; j++) {
              if (tags[j] === '</' + tag + '>') {
                closed = true;
                break;
              }
            }

            if (!closed) {
              return 'Etiqueta HTML ' + tags[i] + ' no cerrada';
            }
          }
        }
      }
    }
    
    if(!challenge.option.value.length) {
      return 'Elije una opción para demostar que eres humano';
    }

    if(!isHuman(challenge)) {
      return 'No eres humano!';
    }

  };

  var isHuman = function (answer) {
    var valid = false,
        challenges = nospam.getChallenges();

    for (var i = 0; i < challenges.length; i++) {

      if (challenges[i].id == answer.id) {

        for (var j = 0; j < challenges[i].options.length; j++) {
          
          if (challenges[i].options[j].value === answer.option.value &&
              challenges[i].options[j].valid) {
            valid = true;
          }
        }
      }
    }

    return valid;
  };

    
};
