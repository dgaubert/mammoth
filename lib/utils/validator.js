/* jslint node: true */
'use strict';

function validateComment(comment, captchaValue) {
  var tags = comment.comment.match(/<(.*?)>/g);

  if (comment.author.match(/^[ÑñáéíóúüÁÉÍÓÚ\w\s._-]+$/) === null) {
    return 'Nombre no válido';
  }

  if (comment.mail.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/) === null) {
    return 'Correo no válido';
  }

  if (!comment.comment.length) {
    return 'Escribe un comentario';
  } else if (tags) {
    var i;
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
        var closed = false;
        var tag;

        if (tags[i].search('</') < 0) {
          tag = tags[i]
            .replace('<','')
            .replace('>','');

          if (tag[0] === 'a') {
            tag = 'a';
          }

          var j;
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

  if(!captchaValue) {
    return 'No eres humano!!';
  }

}

module.exports.validateComment = validateComment;
