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
