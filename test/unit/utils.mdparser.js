/* jslint node:true */
/* global describe: true, it:true*/
'use strict';

var ArticleFake = new require('../fixtures/article'),
    parser = require('../../lib/utils/mdparser');

describe('utils/mdparser', function() {

  describe('parser(toParser)', function () {

    var article = new ArticleFake(),
        result;

    it('With HTML string should return the same HTML', function () {

      article.content = '<h1>Hi! it is a test</h1>\n';
      result = parser(article);

      result.content.should.equal(article.content);
    });

    it('With markdown string should return the HTML', function () {
      var html = '<h1>Hi! it is a test</h1>\n';

      article.content = '# Hi! it is a test';

      result = parser(article);

      result.content.should.equal(html);

    });

  });

});