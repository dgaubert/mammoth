exports.view = function(req, res){
  res.render('index', { title: 'Express!!', pagination: '1-10 de 34' });
};
