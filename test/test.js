var mammoth = require('../mammoth'),
    request = require('supertest'),
    should = require('should');

request = request(mammoth);

console.log(typeof mammoth);

describe('Testing Mammoth Project', function () {

  describe('GET home: /', function () {

    var res;

    before(function (done) {
      request.get('/')
        .set('Content-Type', 'text/html')
        .end(function (err, r) {
          should.not.exist(err);
          if (err) {
            done(err);
          }
          res = r;
          done();
      });
    });

    it('should be a html', function () {
      res.should.be.html;
    });

    it('should have status 200', function () {
      res.should.have.status(200);
    });

  });


  describe('GET blog: /blog', function () {

    var res;

    before(function (done) {
      request.get('/blog')
        .set('Content-Type', 'text/html')
        .end(function (err, r) {
          should.not.exist(err);
          if (err) {
            done(err);
          }
          res = r;
          done();
      });
    });

    it('should be a html', function () {
      res.should.be.html;
    });

    it('should have status 200', function () {
      res.should.have.status(200);
    });

  });

  describe('GET blog and checks the pagination: /blog/1', function () {

    var res;

    before(function (done) {
      request.get('/blog/1')
        .set('Content-Type', 'text/html')
        .end(function (err, r) {
          should.not.exist(err);
          if (err) {
            done(err);
          }
          res = r;
          done();
      });
    });

    it('should be a html', function () {
      res.should.be.html;
    });

    it('should have status 200', function () {
      res.should.have.status(200);
    });

  });



});