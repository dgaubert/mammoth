'use strict';

var _ = require('lodash');
var base = require('./base');

function AdminController() {
  this.template = 'blog/admin/admin';
  this.defaultTemplateContext = {
    title: 'Administración del blog',
    section: 'blog'
  };
}

AdminController.prototype = _.create(base, {
  constructor: AdminController,
});


module.exports = AdminController;
