	'use strict';

var AdminController = function AdminController() {};

AdminController.prototype = {

  // public

  'show': function show(req, res) {
    res.render('blog/admin/admin', {
      title: 'Administración del blog',
      section:'blog'
    });
  }
};

module.exports = AdminController;
