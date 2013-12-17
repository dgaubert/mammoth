function adminController() {
  
  function getAdmin(req, res) {
    res.render('blog/admin/admin', {
      title: 'Administración del blog',
      section:'blog'
    });
  }
  
  return {
    'getAdmin': getAdmin
  };
}

module.exports = adminController;
