module.exports.init = function () {

  /**
   * Retrieves admin section
   * 
   * @param  {Object} req : request
   * @param  {Object} res : response
   * @return {Object} blog admin section
   */
  module.exports.getAdmin = function (req, res) {
    res.render('blog/admin/admin', {
      title: 'Administración del blog',
      section:'blog'
    });
  };
    
};
