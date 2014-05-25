/* jslint node:true */
/* global describe: true, it:true*/
'use strict';

var sinon = require('sinon'),
    AdminController = require('../../lib/controllers/admin'),
    support = require('../fixtures/support'),
    req = support.req,
    res = support.res;

describe('controllers/admin', function () {

  describe('.show', function () {

    it('Blog view should be rendered', sinon.test(function () {
      var adminControlelr = AdminController();

      this.spy(res, 'render');

      adminControlelr.show(req, res);

      res.render.calledWith('blog/admin/admin').should.equal(true);

    }));

  });

});
