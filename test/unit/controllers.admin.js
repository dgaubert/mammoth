var sinon = require('sinon'),
    Admin = require('../../lib/controllers/admin'),
    admin = new Admin(),
    support = require('../fixtures/support'),
    req = support.req,
    res = support.res;

describe('controllers/admin', function () {

  describe('.show', function () {

    it('Blog view should be rendered', sinon.test(function () {

      this.spy(res, 'render');

      admin.show(req, res);

      res.render.calledWith('blog/admin/admin').should.be.true;

    }));

  });

});
