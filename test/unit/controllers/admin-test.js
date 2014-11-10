/* jshint expr: true */
'use strict';

var sinon = require('sinon');

describe('controllers/admin', function () {
  var AdminController = require('../../../lib/controllers/admin');
  var adminController;
  var req = {};
  var res = {
    render: function () {},
  };
  var sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    res.render = sandbox.spy(res, 'render');

    adminController  = new AdminController();
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('.show', function () {

    it('should render admin view', function () {
      adminController.show(req, res);

      res.render.calledWith('blog/admin/admin').should.equal(true);
    });

  });

});
