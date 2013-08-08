/**
 * Retrieves admin section
 * 
 * @param  {Object} req : request
 * @param  {Object} res : response
 * @return {Object} blog admin section
 */
exports.getAdmin = function (req, res) {
  res.render('admin', {
    title: 'Administración del blog',
    section:'blog'
  });
};