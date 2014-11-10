/* jshint expr: true */

var mammoth = require('../../mammoth'),
    request = require('supertest'),
    should = require('should'),
    views,
    response;

// Views to testing
views = [
  {path: '/', status: 200},
  {path: '/blog', status: 200},
  {path: '/blog/login', status: 200},
  {path: '/blog/admin', status: 302},
  {path: '/blog/admin/users', status: 302},
  {path: '/blog/admin/users/new', status: 302},
  {path: '/blog/admin/articles', status: 302},
  {path: '/blog/admin/articles/new', status: 302}
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
        return done(err);
      }
      response = res;
      done();
    });
  });
};

describe('Testing views:', function () {
  views.forEach(function (view) {
    describe('GET ' + view.path + ':', function () {
      getResponse(view.path);
      it('should have status ' + view.status, function () {
        response.should
          .have.property('status')
          .and.equal(view.status);
      });
      if (view.status === 200) {
        it('should be a html', function () {
          response.should.be.html;
        });
      }
    });
  });
});
