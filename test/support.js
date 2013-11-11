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
      hash: '!?L→@,☼G×ã¹?~gQº9ø ↕|?◄p→‼Æ5Â3]BtÆ?äïÂn:♂ð¤▬¤³ Äb☺uèùè?hgÔ▲äbÂù|?E☼ãIºî*l♂Æû?öE¢?ÊAg¸x¼«"\þd‼³&£~►♥♀¶òòñ³K?ö?Pû(C◄ÿr?7ÊK??X+½¦',
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

var Model = function Model() {

  this.model = {};

  this.retrieve = null;

  this.error = null;

};

Model.setModel = function (m) {
  this.model = null;
  this.model = m;
  this.retrieve = this.model;
};

Model.ok = function () {
  this.error = null;
  this.retrieve = this.model;
  return this;
}

Model.ko = function () {
  this.error = new Error('Error');
  this.retrieve = null;
  
  return this;
}

Model.empty = function () {
  this.error = null;
  this.retrieve = {};
  
  return this;
}

Model.findOne = function () {
  return this;
};

Model.find = function () {
  if(!this.error) {
    var ms = [];
    ms.push(this.retrieve);
    this.retrieve = ms;
  }

  return this;
};

Model.select = function () {
  return this;
};

Model.sort = function () {
  return this;
};

Model.skip = function () {
  return this;
};

Model.limit = function () {
  return this;
};

Model.exec = function (callback) {
  // return required values
  callback(this.error, this.retrieve);
};

Model.count = function (callback) {
  // return required values
  callback(this.error, this.retrieve);
};  

Model.categoriesCount = function (callback) {
  // return required values
  callback(this.error, this.retrieve);
};

Model.tagsCount = function (callback) {
  // return required values
  callback(this.error, this.retrieve);
};

module.exports.Model = Model;
