module.exports = function () {

  var adminController = {

    /**
     * Retrieves admin view
     * 
     * @param  {Object} req : request
     * @param  {Object} res : response
     * @return {Object} blog admin section
     */
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
