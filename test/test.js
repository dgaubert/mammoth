var mammoth = require('../mammoth'),
    request = require('supertest'),
    should = require('should');

request = request(mammoth);

describe('GET /', function () {

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
    res.should.have.status(200);
  });

  it('should be a html', function () {
    res.should.have.status(200);
  });

});