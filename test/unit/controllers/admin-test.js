'use strict';
var sinon = require('sinon');

describe('controllers/admin', function () {
  var AdminController = require('../../../lib/controllers/admin');
  var support = require('../../fixtures/support');
  var req = support.req;
  var res = support.res;

  describe('.show', function () {

    it('should render admin view', sinon.test(function () {
      var adminController = new AdminController();
      this.spy(res, 'render');

      adminController.show(req, res);

      res.render.calledWith('blog/admin/admin').should.equal(true);
    }));

  });

});
