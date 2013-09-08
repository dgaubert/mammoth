var guard = require('../lib/utils/guard'),
    should = require('should');

describe('Testing guard', function () {

  var req;

  before(function () {
    req = {};
    req.session = {};
  });

  it('/ with session', function () {
    req.path = '/';
    req.session.user = 'user';
    
    guard.isNext(req).should.be.true;
  });

  it('/blog without session', function () {
    req.path = '/blog';
    req.session.user = null;
    
    guard.isNext(req).should.be.true;
  });

  it('/blog/admin with session', function () {
    req.path = '/blog/admin';
    req.session.user = 'user';

    guard.isNext(req).should.be.true;
  });

  it('/blog/admin/ without session', function () {
    req.path = '/blog/admin';
    req.session.user = null;
    
    guard.isNext(req).should.be.false;
  });

  it('/blog/admin/users', function () {
    req.path = '/blog/admin/users';
    req.session.user = 'user';
    
    guard.isNext(req).should.be.true;
  });

});
