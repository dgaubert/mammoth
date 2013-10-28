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
      save: function (cb) {
        cb(null);
      }
    },
    summary = article;

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

module.exports.next = function () {

};

module.exports.err = {
  status: 500
};

// Models mocks
module.exports.ArticleModel = {
  find: function (filter, callback) {
    callback(null, [article]);
  },
  findOne: function (filter, callback) {
    callback(null, article);
  },
  findAll: function(filter, fields, sort, callback) {
    callback(null, [article]);
  }
};

module.exports.ArticleModelEmpty = {
  find: function (filter, callback) {
    callback(null, []);
  },
  findOne: function (filter, callback) {
    callback(null, {});
  },
  findAll: function (filter, fields, sort, callback) {
    callback(null, []);
  }
};
    
module.exports.ArticleModelKO = {
  find: function (filter, callback) {
    callback(new Error('Error'), null);
  },
  findOne: function (filter, callback) {
    callback(new Error('Error'), null);
  },
  findAll: function(filter, fields, sort, callback) {
    callback(new Error('Error'), null);
  }
};

module.exports.SummaryModel = {
  find: function (filter, sort, callback) {
    callback(null, [summary]);
  },
  categoriesCount: function (callback) {
    callback(null, [{_id: 'category', value: 1}]);
  },
  tagsCount: function (callback) {
    callback(null, [{_id: 'tag', value: 1}]);
  },
  findRange: function (filter, page, cb) {
    cb(null, [summary]);
  },
  count: function (filter, cb) {
    cb(null, 1);
  },
  getLast: function (filter, cb) {
    cb(null, [summary]);
  }
};
      
module.exports.SummaryModelKO = {
  find: function (filter, sort, callback) {
    callback(new Error('Error'), null);
  },
  categoriesCount: function (callback) {
    callback(new Error('Error'), null);
  },
  tagsCount: function (callback) {
    callback(new Error('Error'), null);
  },
  findRange: function (filter, page, cb) {
    cb(new Error('Error'), null);
  },
  count: function (filter, cb) {
    cb(new Error('Error'), null);
  },
  getLast: function (filter, cb) {
    cb(new Error('Error'), null);
  } 
};

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
