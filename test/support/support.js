var Article = require('../../lib/models/article'),
    Picture = require('../../lib/models/picture');

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
  url: '',
  files: {
    picture: {
      path: '',
      name: ''
    }
  }
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

module.exports.article = new Article({
  title: 'title',
  author: 'author',
  slug: 'slug',
  category: 'category',
  abstract: 'abstract',
  content: 'content',
  tags: ['tag1', 'tag2', 'tag3']
});

module.exports.picture = new Picture({
  filename: 'filename',
  metadata: 'metadata'
});

module.exports.user = new Article({
  username: 'username',
  hash: 'hash',
  salt: 'salt'
});
