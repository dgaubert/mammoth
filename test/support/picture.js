var Picture = function () {};

Picture.getPicturesByArticle = function (slug, callback) {

  var files = [{
      _id: '52a343eee3d9f5a30fb5c2e5',
      filename: 'tool-bootstrap.jpg',
      contentType: 'image/png',
      length: 3660,
      chunkSize: 262144,
      uploadDate: new Date(),
      aliases: null,
      metadata: {
        article: 'javascript-herencia-de-prototipos'
      },
      md5: 'b103b87b72db7eb99230ebde8018c29d'
    }
  ];
  
  callback(null, files);
};

module.exports = Picture;