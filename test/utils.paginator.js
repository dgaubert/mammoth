var Paginator = require('../lib/utils/paginator');

describe('utils/paginator', function() {

  var pagination;
    
  describe('.create(0,10)', function () {
    
    before(function () {
      pagination = new Paginator(0, 10);
    });
    
    it('On first page, one page, ten items, no previous page, no next page', function () {
      pagination.should.be.an.instanceof(Object);
      pagination.should.have.property('selected');
      pagination.selected.should.be.a('string');
      pagination.should.have.property('pages');
      pagination.pages.should.be.an.instanceof(Array);
      pagination.pages[0].should.be.an.instanceof(Object);
      pagination.pages[0].should.have.property('count');
      pagination.pages[0].count.should.be.a('number');
      pagination.pages[0].should.have.property('selected');
      pagination.pages[0].selected.should.be.a('boolean');
      pagination.should.have.property('previousPage');
      pagination.previousPage.should.be.a('number');
      pagination.should.have.property('nextPage');
      pagination.nextPage.should.be.a('number');
      
      pagination.pages.should.have.length(1);
      pagination.pages[0].selected.should.be.true;
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
      pagination.pages[0].selected.should.be.true;
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
      pagination.pages[0].selected.should.be.false;
      pagination.pages[1].selected.should.be.true;
      pagination.previousPage.should.equal(0);
      pagination.nextPage.should.equal(-1);
    });

  });

});
