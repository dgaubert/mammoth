/* jslint node:true */
/* global describe: true, it:true*/
'use strict';

var sinon = require('sinon'),
    adminController = require('../lib/controllers/admin'),
    support = require('./support/support'),
    req = support.req,
    res = support.res;

describe('controllers/admin', function () {

  describe('.show', function () {

    it('Blog view should be rendered', sinon.test(function () {
      var adminCntlr = adminController();
      
      this.spy(res, 'render');

      adminCntlr.show(req, res);

      res.render.calledWith('blog/admin/admin').should.equal(true);

    }));
    
  });

});
