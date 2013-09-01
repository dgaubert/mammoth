var mammoth = require('../mammoth'),
    request = require('supertest'),
    should = require('should'),
    paths,
    response;

// Views to testing
paths = [
  '/',
  '/blog',
  '/blog/1',
  '/blog/login'
];

// Get app
request = request(mammoth);

// Get views
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
};

describe('Testing Mammoth Project', function () {
  paths.forEach(function (path) {
    describe('GET ' + path + ':', function () {
      getResponse(path);

      it('should be a html', function () {
        response.should.be.html;
      });

      it('should have status 200', function () {
        response.should.have.status(200);
      });
    });
  });
});
