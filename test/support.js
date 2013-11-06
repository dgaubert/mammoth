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
      comments: ['comment'],
      save: function (callback) {
        callback(null);
      }
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
  session: {},
  url: ''
};

module.exports.res = {
  status: function () {},
  redirect: function () {},
  render: function () {},
  writeHead: function () {},
  end: function () {}
};

module.exports.next = function () {};

module.exports.err = {
  status: 500
};

// Models fake
var ArticleModel = function ArticleModel(mode) {

  var one = false;

  this.find = function () {  
    this.one = false;
    return this;
  };

  this.findOne = function () {
    this.one = true;
    return this;
  };

  this.select = function () {
    return this;
  };

  this.sort = function () {
    return this;
  };

  this.skip = function () {
    return this;
  };

  this.limit = function () {
    return this;
  };

  this.exec = function (callback) {
    // return required values
    if (one) {
      callback(null, article);
    } else {
      callback(null, [article]);
    }
  };

  this.count = function (callback) {
    callback(null, 1);
  };  

  this.categoriesCount = function (callback) {
    // return required values
    callback(null, [{_id: 'category', value: 1}]);
  };

  this.tagsCount = function (callback) {
    // return required values
    callback(null, [{_id: 'tag', value: 1}]);
  };

};

module.exports.ArticleModel = new ArticleModel();

// Fake model: throw error
// ---------------------------------------------

var ArticleModelKO = new ArticleModel();

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

var ArticleModelEmpty = new ArticleModel();

ArticleModelEmpty.exec = function (callback) {
  // return empty values
  if (one) {
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

module.exports.UserModel = {
  find: function (filter, callback) {
    callback(null, [{
      salt: 'h9Sr0AlBfM+Xi9gJZQeWQKyfPlAur5+7jkELi9tzjJqc0FLVKUO6lWwi8U8OxujnbZY+8Jdz3vRkfalxSWRgeG60Rhm6t4Bb3eGKGifu7To6BUMFAjbB+xcShUY47dB4+H6gzvVVkYDMYfCUmyQuUTs73SUlxbdFdj2A3D8rr9c=',
      hash: '!?L→@,☼G×ã¹?~gQº9ø ↕|?◄p→‼Æ5Â3]BtÆ?äïÂn:♂ð¤▬¤³ Äb☺uèùè?hgÔ▲äbÂù|?E☼ãIºî*l♂Æû?öE¢?ÊAg¸x¼«"\þd‼³&£~►♥♀¶òòñ³K?ö?Pû(C◄ÿr?7ÊK??X+½¦'
    }]);
  }
};

module.exports.UserModelEmpty = {
  find: function (filter, callback) {
    callback(null, [{}]);
  }
};

module.exports.UserModelKO = {
  find: function (filter, callback) {
    callback(new Error('Error'), null);
  }
};
