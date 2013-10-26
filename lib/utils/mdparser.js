var marked = require('marked');

module.exports = function(toParse) {
  var parsed;
  if (toParse instanceof Array) {
    parsed = toParse;

    for (var i = 0; i < toParse.length; i++) {
      parsed[i].abstract = marked(toParse[i].abstract);
    }

  } else if (toParse instanceof Object) {
    parsed = toParse;

    parsed.content = marked(toParse.content);
  }

  return parsed;
};