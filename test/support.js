// Node.js mocks

var article = module.exports.article = {
      tilte: 'title',
      author: 'author',
      created: new Date(),
      slug: '/blog/article/title',
      category: 'category',
      abstract: 'abstract',
      content: 'content',
      tags: ['tag'],
      comments: [{comment: 'comment'}],
      save: function (callback) {
        callback(null);
      }
    },
    user = module.exports.user = {
      salt: 'h9Sr0AlBfM+Xi9gJZQeWQKyfPlAur5+7jkELi9tzjJqc0FLVKUO6lWwi8U8OxujnbZY+8Jdz3vRkfalxSWRgeG60Rhm6t4Bb3eGKGifu7To6BUMFAjbB+xcShUY47dB4+H6gzvVVkYDMYfCUmyQuUTs73SUlxbdFdj2A3D8rr9c=',
      hash: '!?L→@,☼G×ã¹?~gQº9ø ↕|?◄p→‼Æ5Â3]BtÆ?äïÂn:♂ð¤▬¤³ Äb☺uèùè?hgÔ▲äbÂù|?E☼ãIºî*l♂Æû?öE¢?ÊAg¸x¼«"\þd‼³&£~►♥♀¶òòñ³K?ö?Pû(C◄ÿr?7ÊK??X+½¦'
    };

module.exports.params = {
  slug: '/blog/article/slug'
};

module.exports.path = '/blog/article/slug';

module.exports.session = {
  user: ''
};

module.exports.url = '/';

module.exports.req = {
  body: {},
  params: {},
  path: '',
  session: {
    regenerate: function () {},
    destroy: function () {}
  },
  url: ''
};

module.exports.res = {
  status: function () {},
  redirect: function () {},
  render: function () {},
  writeHead: function () {},
  set: function () {},
  send: function () {},
  end: function () {}
};

module.exports.next = function () {};

module.exports.err = {
  status: 500
};

// Article Model fake
var ArticleModel = function ArticleModel() {
  this.one = false;

  this.save = function (callback) {
    callback(null);
  };
};

ArticleModel.find = function () {  
  this.one = false;
  return this;
};

ArticleModel.findOne = function () {
  this.one = true;
  return this;
};

ArticleModel.select = function () {
  return this;
};

ArticleModel.sort = function () {
  return this;
};

ArticleModel.skip = function () {
  return this;
};

ArticleModel.limit = function () {
  return this;
};

ArticleModel.exec = function (callback) {
  // return required values
  if (this.one) {
    callback(null, article);
  } else {
    callback(null, [article]);
  }
};

ArticleModel.count = function (callback) {
  callback(null, 1);
};

ArticleModel.categoriesCount = function (callback) {
  // return required values
  callback(null, [{_id: 'category', value: 1}]);
};

ArticleModel.tagsCount = function (callback) {
  // return required values
  callback(null, [{_id: 'tag', value: 1}]);
};

module.exports.ArticleModel = ArticleModel;

// Fake model: throw error
// ---------------------------------------------

var ArticleModelKO = function ArticleModelKO() {
  this.one = false;

  this.save = function (callback) {
    callback(null);
  };
};

ArticleModelKO.find = function () {  
  this.one = false;
  return this;
};

ArticleModelKO.findOne = function () {
  this.one = true;
  return this;
};

ArticleModelKO.select = function () {
  return this;
};

ArticleModelKO.sort = function () {
  return this;
};

ArticleModelKO.skip = function () {
  return this;
};

ArticleModelKO.limit = function () {
  return this;
};

ArticleModelKO.exec = function (callback) {
  // throw exception
  callback(new Error('Error'), null);
};

ArticleModelKO.count = function (callback) {
  callback(new Error('Error'), null);
};  

ArticleModelKO.categoriesCount = function (callback) {
  // throw exception
  callback(new Error('Error'), null);
};

ArticleModelKO.tagsCount = function (callback) {
  // throw exception
  callback(new Error('Error'), null);
};

module.exports.ArticleModelKO = ArticleModelKO;

// Fake model: return empty values
// ---------------------------------------------

var ArticleModelEmpty = function ArticleModelEmpty() {
  this.one = false;
  
  this.save = function (callback) {
    callback(null);
  };
};

ArticleModelEmpty.find = function () {  
  this.one = false;
  return this;
};

ArticleModelEmpty.findOne = function () {
  this.one = true;
  return this;
};

ArticleModelEmpty.select = function () {
  return this;
};

ArticleModelEmpty.sort = function () {
  return this;
};

ArticleModelEmpty.skip = function () {
  return this;
};

ArticleModelEmpty.limit = function () {
  return this;
};

ArticleModelEmpty.exec = function (callback) {
  // return empty values
  if (this.one) {
    callback(null, {});
  } else {
    callback(null, []);
  }
};

ArticleModelEmpty.count = function (callback) {
  callback(null, 0);
};

ArticleModelEmpty.categoriesCount = function (callback) {
  // return empty values
  callback(null, [{}]);
};

ArticleModelEmpty.tagsCount = function (callback) {
  // return empty values
  callback(null, [{}]);
};

module.exports.ArticleModelEmpty = ArticleModelEmpty;

// Models fake
var UserModel = function UserModel() {


  this.find = function () {  
    return this;
  };

  this.exec = function (callback) {
    callback(null, [article]);
  };

};

module.exports.UserModel = new UserModel();

// Fake model: return empty values
// ---------------------------------------------

var UserModelEmpty = new UserModel();

UserModelEmpty.exec = function (callback) {
  callback(null, [{}]);
};

module.exports.UserModelEmpty = UserModelEmpty;

// Fake model: return empty values
// ---------------------------------------------

var UserModelKO = new UserModel();

UserModelKO.exec = function (callback) {
  callback(new Error('Error'), null);
};

module.exports.UserModelKO = UserModelKO;
