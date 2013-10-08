var support = require('./support'),
    sinon = require('sinon'),
    Admin = require('../lib/routes/admin');

describe('routes/admin', function () {
  var admin = new Admin();
      req = support.req,
      res = support.res;

  describe('.getAdmin', function () {
    res.render = sinon.spy();

    admin.getAdmin(req, res);

    res.render.calledWith('blog/admin/admin').should.be.true;
  });

});
