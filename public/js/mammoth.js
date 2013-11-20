$(document).ready(function() {

  var checkComment = function(comment) {
    var tags = comment[2].value.match(/<(.*?)>/g),
        closed,
        tag,
        i,
        j;

    if (comment[0].value.match(/^[\w\s._-]+$/) === null) {
      $('form#comment')
        .find('#comment-msg')
        .text('Nombre no válido');
      return 0;
    }
    if (comment[1].value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/) === null) {
      $('form#comment')
        .find('#comment-msg')
        .text('Correo no válido');
      return 0;
    }
    if (!comment[2].value.length) {
      $('form#comment').find('#comment-msg').text('Escribe un comentario');
      return 0;
    }
    /*else {
      for (i = 0; i < tags.length; i++) {
        if (tags[i].search('<a href=') < 0 && tags[i].search('</a>') < 0 &&
          tags[i].search('<code>') < 0 && tags[i].search('</code>') < 0 &&
          tags[i].search('<strong>') < 0 && tags[i].search('</strong') < 0 &&
          tags[i].search('<blockquote>') < 0 && tags[i].search('</blockquote>') < 0) {
          $('form#comment').find('#comment-msg').text('Etiqueta HTML ' + tags[i] + ' no válida');
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
            $('form#comment').find('#comment-msg').text('Etiqueta HTML ' + tags[i] + ' no cerrada');
            return 0;
          }
        }
      }
    }
    */
    if(comment[4].value === undefined || comment[4].value === null) {
      $('form#comment')
        .find('#comment-msg')
        .text('Elije una opción para demostar que es humano');
      return 0;
    }
    return 1;
  };

  $('button#comment').on('click', function (e) {
    e.preventDefault();
    var comment = $('form#comment').serializeArray();

    if (checkComment(comment)) {
      $.post(location.pathname, comment)
        .done(function(msg) {
          $('form#comment')
            .find('#comment-msg')
            .text(msg);
          setTimeout(function () {
            location.reload();
          }, 1000);
        })
        .fail(function(jqXHR, error, errorThrown) {
          $('form#comment')
            .find('#comment-msg')
            .text(errorThrown);
        });

    }

  });

});