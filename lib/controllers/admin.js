'use strict';

function AdminController() {
}

AdminController.prototype = {
  show: function (req, res) {
    res.render('blog/admin/admin', {
      title: 'Administración del blog',
      section: 'blog'
    });
  }
};

module.exports = AdminController;
