var challenger = require('../utils/challenger');

module.exports.validateComment = function (comment, challenge) {
  var tags = comment.comment.match(/<(.*?)>/g),
      closed,
      tag,
      i,
      j;

  if (comment.author.match(/^[\w\s._-]+$/) === null) {
    return 'Nombre no válido';
  }

  if (comment.mail.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/) === null) {
    return 'Correo no válido';
  }

  if (!comment.comment.length) {
    return 'Escribe un comentario';
  } else if (tags !== null) {
    for (i = 0; i < tags.length; i++) {
      if (tags[i].search('<a href=') < 0 &&
          tags[i].search('</a>') < 0 &&
          tags[i].search('<code>') < 0 &&
          tags[i].search('</code>') < 0 &&
          tags[i].search('<strong>') < 0 &&
          tags[i].search('</strong') < 0 &&
          tags[i].search('<blockquote>') < 0 &&
          tags[i].search('</blockquote>') < 0 &&
          tags[i].search('<br/>') < 0) {
        return 'Etiqueta HTML ' + tags[i] + ' no válida';
      }

      if (tags[i] !== '<br/>') {
        closed = false;

        if (tags[i].search('</') < 0) {
          tag = tags[i]
            .replace('<','')
            .replace('>','');

          if (tag[0] === 'a') {
            tag = 'a';
          }

          for (j = i; j < tags.length; j++) {
            if (tags[j] === '</' + tag + '>') {
              closed = true;
              break;
            }
          }

          if (!closed) {
            return 'Etiqueta HTML ' + tags[i] + ' no cerrada';
          }
        }
      }
    }
  }

  if(!challenge.option.value.length) {
    return 'Elije una opción para demostar que eres humano';
  }

  if(!challenger.isHuman(challenge)) {
    return 'No eres humano!';
  }

};
