var app = require('../app'),
    request = require('supertest'),
    should = require('should');

request = request(app);

describe('GET /', function () {

  var res;

  before(function (done) {
    request.get('/')
      .set('Content-Type', 'text/html')
      .end(function (err, r) {
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