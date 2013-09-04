var paginator = require('../lib/utils/paginator'),
    should = require('should');
    
describe('Testing paginator:', function() {
  var pagination;
  
  describe('Pagination -> paginator#create(1,100):', function () {
    
    before(function () {
      pagination = paginator.create(1,100);
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
    
    it('Property "pages" should have a length: 10', function () {
      pagination.pages.should.have.length(10);
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

});