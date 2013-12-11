var Picture = function () {
  this._id = '52a343eee3d9f5a30fb5c2e5';
  this.filename = 'tool-bootstrap.jpg';
  this.contentType = 'image/png';
  this.length = 3660;
  this.chunkSize = 262144;
  this.uploadDate = new Date();
  this.aliases = null;
  this.metadata = {
    article: 'javascript-herencia-de-prototipos'
  };
  this.md5 = 'b103b87b72db7eb99230ebde8018c29d';
};

Picture.prototype.save = function (callback) {
  callback(null);
};

module.exports = Picture;