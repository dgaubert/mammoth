var Captcha = function () {
  this._id = '52a343eee3d9f5a30fb5c2e5';
  this.filename = '1.png';
  this.contentType = 'image/png';
  this.length = 1;
  this.chunkSize = 1;
  this.uploadDate = new Date();
  this.aliases = null;
  this.metadata = {
    value: 1
  };
  this.md5 = 'b103b87b72db7eb99230ebde8018c29d';
};

Captcha.prototype.save = function (callback) {
  callback(null);
};

module.exports = Captcha;
