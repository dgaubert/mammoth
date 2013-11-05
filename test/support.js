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

// Models mocks
var ArticleModel = function ArticleModel(mode) {

  var one = false,
      behavior = mode || 1;

  this.setBehavior = function (value) {
    this.behavior = value;
  };

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

  this.count = function () {
    return this;
  };

  this.skip = function () {
    return this;
  };

  this.limit = function () {
    return this;
  };

  this.exec = function (callback) {
    if (behavior === 1) {
      // return required values
      if (one) {
        callback(null, article);
      } else {
        callback(null, [article]);
      }
    } else if (behavior === 0) {
      // return empty values
      if (one) {
        callback(null, {});
      } else {
        callback(null, []);
      }
    } else if (behavior === -1) {
      // throws exception
      callback(new Error('Error'), null);
    }
  };

  this.categoriesCount = function (callback) {
    if (behavior === 1) {
      // return required values
      callback(null, [{_id: 'category', value: 1}]);
    } else if (behavior === 0) {
      // return empty values
      callback(null, [{}]);
    } else if (behavior === -1) {
      // throws exception
      callback(new Error('Error'), null);
    }
  };

  this.tagsCount = function (callback) {
    if (behavior === 1) {
      // return required values
      callback(null, [{_id: 'tag', value: 1}]);
    } else if (behavior === 0) {
      // return empty values
      callback(null, [{}]);
    } else if (behavior === -1) {
      // throws exception
      callback(new Error('Error'), null);
    }
  };

};

module.exports.ArticleModel = new ArticleModel(1);

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
