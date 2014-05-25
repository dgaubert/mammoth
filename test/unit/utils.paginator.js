/* jslint node:true */
/* global describe: true, it:true, before:true*/
'use strict';

var Paginator = require('../../lib/utils/paginator');

describe('utils/paginator', function() {

  var pagination;

  describe('.create(0,10)', function () {

    before(function () {
      pagination = new Paginator(0, 10);
    });

    it('On first page, one page, ten items, no previous page, no next page', function () {
      pagination.should.be.an.instanceof(Object);
      pagination.should.have.property('pages');
      pagination.pages.should.be.an.instanceof(Array);
      pagination.pages[0].should.be.an.instanceof(Object);
      pagination.pages[0].should.have.property('count');
      pagination.pages[0].count.should.be.type('number');
      pagination.pages[0].should.have.property('selected');
      pagination.pages[0].selected.should.be.type('boolean');
      pagination.should.have.property('previousPage');
      pagination.previousPage.should.be.type('number');
      pagination.should.have.property('nextPage');
      pagination.nextPage.should.be.type('number');
      pagination.pages.should.have.length(1);
      pagination.pages[0].selected.should.equal(true);
      pagination.previousPage.should.equal(-1);
      pagination.nextPage.should.equal(-1);
    });

  });

  describe('.create(0,11):', function () {

    before(function () {
      pagination = new Paginator(0, 11);
    });

    it('On first page, two pages, eleven items, no previous page, next page', function () {
      pagination.pages.should.have.length(2);
      pagination.pages[0].selected.should.equal(true);
      pagination.previousPage.should.equal(-1);
      pagination.nextPage.should.equal(1);
    });

  });

  describe('.create(1, 11):', function () {

    before(function () {
      pagination = new Paginator(1, 11);
    });

    it('On second page, two pages, eleven items, previous page, no next page', function () {
      pagination.pages.should.have.length(2);
      pagination.pages[0].selected.should.equal(false);
      pagination.pages[1].selected.should.equal(true);
      pagination.previousPage.should.equal(0);
      pagination.nextPage.should.equal(-1);
    });

  });

});
