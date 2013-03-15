exports.getAdmin = function (req, res) {
  res.render('admin', {
    title: 'Administración del blog',
    section:'blog'
  });
};