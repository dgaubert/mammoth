var mammoth = require('../mammoth'),
    request = require('supertest'),
    should = require('should'),
    response;

request = request(mammoth);

var getResponse = function (path) {
  before(function (done) {
    request.get(path)
      .set('Content-Type', 'text/html')
      .end(function (err, res) {
        should.not.exist(err);
        if (err) {
          done(err);
        }
        response = res;
        done();
    });
  });
}

describe('Testing Mammoth Project', function () {

  describe('GET home: /', function () {

    getResponse('/');

    it('should be a html', function () {
      response.should.be.html;
    });

    it('should have status 200', function () {
      response.should.have.status(200);
    });

  });


  describe('GET blog: /blog', function () {

    getResponse('/blog');

    it('should be a html', function () {
      response.should.be.html;
    });

    it('should have status 200', function () {
      response.should.have.status(200);
    });

  });

  describe('GET blog and checks the pagination: /blog/1', function () {

    getResponse('/blog/1');

    it('should be a html', function () {
      response.should.be.html;
    });

    it('should have status 200', function () {
      response.should.have.status(200);
    });

  });

  describe('GET blog: /blog/login', function () {

    getResponse('/blog/login');

    it('should be a html', function () {
      response.should.be.html;
    });

    it('should have status 200', function () {
      response.should.have.status(200);
    });

  });

});