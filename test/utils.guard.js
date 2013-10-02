var guard = require('../lib/utils/guard'),
    request = require('supertest');

describe('utils/guard', function () {
  var req;

  describe('.keepOn(req)', function () {

    before(function () {
      req = {};
      req.session = {};
    });

    it('"/blog" with session, should be continued', function () {
      req.path = '/';
      req.session.user = 'user';
      
      guard.keepOn(req).should.be.true;
    });

    it('"/blog" without session, should be redirected', function () {
      req.path = '/blog';
      req.session.user = null;
      
      guard.keepOn(req).should.be.true;
    });

    it('"/blog/admin" with session, should be continued', function () {
      req.path = '/blog/admin';
      req.session.user = 'user';

      guard.keepOn(req).should.be.true;
    });

    it('"/blog/admin" without session, should be redirected', function () {
      req.path = '/blog/admin';
      req.session.user = null;
      
      guard.keepOn(req).should.be.false;
    });

    it('"/blog/admin/users" with session, should be continued', function () {
      req.path = '/blog/admin/users';
      req.session.user = 'user';
      
      guard.keepOn(req).should.be.true;
    });
    
    it('"/blog/admin/users" without session, should be redirected', function () {
      req.path = '/blog/admin/users';
      req.session.user = null;
      
      guard.keepOn(req).should.be.false;
    });
    
  });
  
});
