exports.getAdmin = function (req, res) {
  res.render('admin');
};

// List

exports.getUsers = function (req, res) {
  res.render('users');
};

exports.getArticles = function (req, res) {
  res.render('articles');
};

// User

exports.getNewUser = function (req, res) {
  res.render('user');
};

exports.newUser = function (req, res) {
  res.render('user');
};

exports.getUser = function (req, res) {
  res.render('user');
};

exports.updateUser = function (req, res) {
  res.render('user');
};

// Article

exports.getNewArticle = function (req, res) {
  res.render('article');
};

exports.newArticle = function (req, res) {
  res.render('article');
};

exports.getArticle = function (req, res) {
  res.render('article');
};

exports.updateArticle = function (req, res) {
  res.render('article');
};