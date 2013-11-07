var support = require('./support'),
    sinon = require('sinon'),
    Admin = require('../lib/routes/admin'),
    admin = new Admin(),
    req = support.req,
    res = support.res;

describe('routes/admin', function () {

  describe('.getAdmin', function () {

    it('Blog view shouold be rendered', sinon.test(function () {
      this.spy(res, 'render');

      admin.getAdmin(req, res);

      res.render.calledWith('blog/admin/admin').should.be.true;

    }));
    
  });

});
