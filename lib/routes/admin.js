/* jslint node: true */
'use strict';

function AdminRoute() {

  // public

  function show(req, res) {
    res.render('blog/admin/admin', {
      title: 'Administración del blog',
      section:'blog'
    });
  }

  // expose

  return {
    'show': show
  };
}

module.exports = AdminRoute;
