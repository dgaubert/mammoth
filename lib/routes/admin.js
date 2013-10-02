module.exports = function (app) {

  /**
   * Retrieves admin section
   * 
   * @param  {Object} req : request
   * @param  {Object} res : response
   * @return {Object} blog admin section
   */
  var getAdmin = function (req, res) {
    res.render('blog/admin/admin', {
      title: 'Administración del blog',
      section:'blog'
    });
  };
  
  app.get('/blog/admin', getAdmin);
  
};