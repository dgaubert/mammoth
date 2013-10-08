// Node.js mocks

module.exports.article = {
  tilte: 'title',
  author: 'author',
  created: new Date(),
  slug: '/blog/article/title',
  category: 'category',
  abstract: 'abstract',
  content: 'content',
  tags: ['tag']
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

module.exports.next = function () {

};

module.exports.err = {
  status: 500
};

// Models mocks
module.exports.ArticleModel = {
  findAll: function(filter, fields, sort, callback) {
    callback(null, [{
      tilte: 'title',
      author: 'author',
      created: new Date(),
      slug: '/blog/article/title',
      category: 'category',
      abstract: 'abstract',
      content: 'content',
      tags: ['tag']
    }]);
  }
};

module.exports.ArticleModelEmpty = {
  findAll: function(filter, fields, sort, callback) {
    callback(null, []);
  }
};
    
module.exports.ArticleModelKO = {
  findAll: function(filter, fields, sort, callback) {
    callback('error', null);
  }
};

module.exports.SummaryModel = {
  categoriesCount: function (callback) {
    callback(null, [{_id: 'category1', value: 1}]);
  },
  tagsCount: function (callback) {
    callback(null, [{_id: 'tag1', value: 1}]);
  }
};
      
module.exports.SummaryModelKO = {
  categoriesCount: function (callback) {
    callback('error', null);
  },
  tagsCount: function (callback) {
    callback('error', null);
  }
};
