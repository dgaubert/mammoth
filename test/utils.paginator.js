var paginator = require('../lib/utils/paginator'),
    should = require('should');
    
describe('Testing paginator:', function() {
  var pagination;
  
  describe('Pagination -> paginator#create(0,9):', function () {
    
    before(function () {
      pagination = paginator.create(0,9);
    });
    
    it('Should return a object', function () {
      pagination.should.be.an.instanceof(Object);
    });
    
    it('Should have property "selected"', function () {
      pagination.should.have.property('selected');
    });
    
    it('Property "selected" should be a "string"', function () {
      pagination.selected.should.be.a('string');
    });
    
    it('Should have property "pages"', function () {
      pagination.should.have.property('pages');
    });
    
    it('Property "pages" should be an instance of Array', function () {
      pagination.pages.should.be.an.instanceof(Array);
    });
    
    it('Property "pages" should have a length: 1', function () {
      pagination.pages.should.have.length(1);
    });

    it('Property "pages[0]" should have an instance of Object', function () {
      pagination.pages[0].should.be.an.instanceof(Object);
    });
    
    it('Property "pages[0]" should have property "count"', function () {
      pagination.pages[0].should.have.property('count');
    });

    it('Property "pages[0].count" should be a "number"', function () {
      pagination.pages[0].count.should.be.a('number');
    });

    it('Property "pages[0]" should have property "selected"', function () {
      pagination.pages[0].should.have.property('selected');
    });

    it('Property "pages[0].selected" should be a "boolean"', function () {
      pagination.pages[0].selected.should.be.a('boolean');
    });

    it('Should have property "previousPage"', function () {
      pagination.should.have.property('previousPage');
    });
    
    it('Property "previousPage" should be a "number"', function () {
      pagination.previousPage.should.be.a('number');
    });
    
    it('Should have property "nextPage"', function () {
      pagination.should.have.property('nextPage');
    });
    
    it('Property "nextPage" should be a "number"', function () {
      pagination.nextPage.should.be.a('number');
    });
    
  });

  describe('Pagination -> paginator#create(0,10):', function () {
    
    before(function () {
      pagination = paginator.create(0,10);
    });
    
    it('Property "pages" should have a length: 1', function () {
      pagination.pages.should.have.length(1);
    });

    it('Property "pages[0].selected" should be true', function () {
      pagination.pages[0].selected.should.be.true;
    });
    
    it('Property "previousPage" should equal -1', function () {
      pagination.previousPage.should.equal(-1);
    });
        
    it('Property "nextPage" should equal -1', function () {
      pagination.nextPage.should.equal(-1);
    });
    
  });

  describe('Pagination -> paginator#create(0,11):', function () {
    
    before(function () {
      pagination = paginator.create(0,11);
    });
    
    it('Property "pages" should have a length: 2', function () {
      pagination.pages.should.have.length(2);
    });

    it('Property "pages[0].selected" should be true', function () {
      pagination.pages[0].selected.should.be.true;
    });
    
    it('Property "previousPage" should equal -1', function () {
      pagination.previousPage.should.equal(-1);
    });
        
    it('Property "nextPage" should equal 1', function () {
      pagination.nextPage.should.equal(1);
    });
    
  });

  describe('Pagination -> paginator#create(1,11):', function () {
    
    before(function () {
      pagination = paginator.create(1,11);
    });
    
    it('Property "pages" should have a length: 2', function () {
      pagination.pages.should.have.length(2);
    });

    it('Property "pages[0].selected" should be false', function () {
      pagination.pages[0].selected.should.be.false;
    });

    it('Property "pages[1].selected" should be true', function () {
      pagination.pages[1].selected.should.be.true;
    });
    
    it('Property "previousPage" should equal 0', function () {
      pagination.previousPage.should.equal(0);
    });
        
    it('Property "nextPage" should equal -1', function () {
      pagination.nextPage.should.equal(-1);
    });
    
  });

});