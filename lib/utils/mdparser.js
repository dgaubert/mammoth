//
var mdparser = function mdparser(md) {
  var marked = require('marked');

  if (md instanceof Array) {
    for (var i = 0; i < md.length; i++) {
      md[i].abstract = marked(md[i].abstract);
    }
  } else if (md instanceof Object) {
    md.content = marked(md.content);
  }
  
  return md;
};

module.exports = mdparser;
