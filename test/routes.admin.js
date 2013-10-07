var sinon = require('sinon'),
    Admin = require('../lib/routes/admin');

describe('routes/admin', function () {
  var admin = new Admin();
      req = {},
      res = {
        render: sinon.spy()
      };

  describe('.getAdmin', function () {
    admin.getAdmin(req, res);

    res.render.calledWith('blog/admin/admin').should.be.true;
  });

});
