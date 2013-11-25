module.exports = function () {

  /**
   * Retrieves admin view
   * 
   * @param  {Object} req : request
   * @param  {Object} res : response
   * @return {Object} blog admin section
   */
  this.getAdmin = function (req, res) {
    res.render('blog/admin/admin', {
      title: 'Administración del blog',
      section:'blog'
    });
  };
    
};
