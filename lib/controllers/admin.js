module.exports = function () {

  var adminController = {

    // Retrieves admin view
    getAdmin: function (req, res) {
      res.render('blog/admin/admin', {
        title: 'Administración del blog',
        section:'blog'
      });
    }
  };
  
  // Expose controller
  return adminController;
};
