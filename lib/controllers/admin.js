/* jslint node: true */
'use strict';

var AdminController = function AdminController() {};

// public

AdminController.prototype.show = function show(req, res) {
  res.render('blog/admin/admin', {
    title: 'Administración del blog',
    section:'blog'
  });
};

module.exports = AdminController;
