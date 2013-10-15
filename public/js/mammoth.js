$(document).ready(function() {
  var checkComment = function() {
    var comment = $('form#comment').serializeArray(),
        tags = comment[2].value.match(/<(.*?)>/g),
        closed,
        tag,
        i,
        j;
    if (comment[0].value.match(/^[\w\s._-]+$/) === null) {
      comment[0].addClass('hass-error');
      $('form#comment').find('#error-msg').text('Nombre no valido');
      return 0;
    }
    if (comment[1].value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/) === null) {
      $('form#comment').find('#error-msg').text('Correo electr\u00f3nico incorrecto');
      return 0;
    }
    if (!comment[2].value.length) {
      $('form#comment').find('#error-msg').text('Escribe un comentario');
      return 0;
    } else {
      for (i = 0; i < tags.length; i++) {
        if (tags[i].search('<a href=') < 0 && tags[i].search('</a>') < 0 &&
          tags[i].search('<code>') < 0 && tags[i].search('</code>') < 0 &&
          tags[i].search('<strong>') < 0 && tags[i].search('</strong') < 0 &&
          tags[i].search('<blockquote>') < 0 && tags[i].search('</blockquote>') < 0) {
          $('form#comment').find('#error-msg').text('Etiqueta HTML ' + tags[i] + ' no válida');
          return 0;
        }
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
            $('form#comment').find('#error-msg').text('Etiqueta HTML ' + tags[i] + ' no cerrada');
            return 0;
          }
        }
      }
    }
    return 1;
  };
  $('button#comment').on('click', function (e) {
    if (!checkComment()) {
      e.preventDefault();
    }
  });

});