$(document).ready(function() {
  var checkComment = function() {
    var comment = $('form#comment').serializeArray(),
        tags = comment[2].value.match(/<(.*?)>/g),
        closed,
        tag,
        i,
        j;
    if (comment[0].value.match(/^[\w\s._-]+$/) === null) {
      $('form#comment').find('#error-msg').text('Nombre no válido');
      return 0;
    }
    if (comment[1].value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/) === null) {
      $('form#comment').find('#error-msg').text('Correo no válido');
      return 0;
    }
    if (!comment[2].value.length) {
      $('form#comment').find('#error-msg').text('Escribe un comentario');
      return 0;
    }

    /*else {
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
    }*/
    return 1;
  };

  var isHuman = function () {
    var comment = $('form#comment').serializeArray();

    if(comment[4].value === undefined || comment[3].value === null) {
      $('form#comment').find('#error-msg').text('Elije una opción para demostar que es humano');
      return 0;
    }

    $.post('/blog/human', {
        id: comment[3].value,
        option: {
          value: comment[4].value
        }
      })
      .done(function() {
        alert('done');
        return 1;
      })
      .fail(function() {
        alert('fail');
        $('form#comment').find('#error-msg').text('Ups! Parece que no eres humano.');
        return 0;
      });
  };

  $('button#comment').on('click', function (e) {
    if (!checkComment()) {
      e.preventDefault();
    } else if (!isHuman()) {
      e.preventDefault();
    }
  });

});