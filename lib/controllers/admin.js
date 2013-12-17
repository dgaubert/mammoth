//
var adminController = function adminController() {

  var controller = {

    //
    getAdmin: function getAdmin(req, res) {
      res.render('blog/admin/admin', {
        title: 'Administración del blog',
        section:'blog'
      });
    }
  };
  
  return controller;
};

module.exports = adminController;
