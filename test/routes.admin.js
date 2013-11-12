var sinon = require('sinon'),
    Admin = require('../lib/routes/admin'),
    admin = new Admin(),
    support = require('./support/support'),
    req = support.req,
    res = support.res;

describe('routes/admin', function () {

  describe('.getAdmin', function () {

    it('Blog view should be rendered', sinon.test(function () {
      
      this.spy(res, 'render');

      admin.getAdmin(req, res);

      res.render.calledWith('blog/admin/admin').should.be.true;

    }));
    
  });

});
