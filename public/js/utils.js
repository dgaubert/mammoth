'use strict';

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
        .removeClass('text-info')
        .addClass('text-danger')
        .text('Nombre no válido');
      return 0;
    }
    if (comment[1].value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/) === null) {
      $('form#comment')
        .find('#comment-msg')
        .removeClass('text-info')
        .addClass('text-danger')
        .text('Correo no válido');
      return 0;
    }
    if (!comment[2].value.length) {
      $('form#comment').find('#comment-msg').text('Escribe un comentario');
      return 0;
    } else if (tags !== null) {
      for (i = 0; i < tags.length; i++) {
        if (tags[i].search('<a href=') < 0 && tags[i].search('</a>') < 0 &&
          tags[i].search('<code>') < 0 && tags[i].search('</code>') < 0 &&
          tags[i].search('<strong>') < 0 && tags[i].search('</strong') < 0 &&
          tags[i].search('<blockquote>') < 0 && tags[i].search('</blockquote>') < 0) {
          $('form#comment')
            .find('#comment-msg')
            .removeClass('text-info')
            .addClass('text-danger')
            .text('Etiqueta HTML ' + tags[i] + ' no válida');
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
            $('form#comment')
              .find('#comment-msg')
              .removeClass('text-info')
              .addClass('text-danger')
              .text('Etiqueta HTML ' + tags[i] + ' no cerrada');
            return 0;
          }
        }
      }
    }

    if(comment[4] === undefined ||
        comment[4].value === undefined ||
        comment[4].value === null) {
      $('form#comment')
        .find('#comment-msg')
        .removeClass('text-info')
        .addClass('text-danger')
        .text('Elije una opción para demostar que eres humano');
      return 0;
    }
    return 1;
  };

  $('button#comment').on('click', function (e) {
    e.preventDefault();
    var comment = $('form#comment').serializeArray();

    if (checkComment(comment)) {
      $.post(location.pathname  + '/comment', comment)
        .done(function(msg) {
          $('form#comment')
            .find('#comment-msg')
            .removeClass('text-danger')
            .addClass('text-info')
            .text(msg);
          setTimeout(function () {
            location.pathname = location.pathname + '#comments';
            location.reload(true);
          }, 1000);
        })
        .fail(function(jqXHR) {
          $('form#comment')
            .find('#comment-msg')
            .removeClass('text-info')
            .addClass('text-danger')
            .text(jqXHR.responseText);
        });

    }

  });

  $('#carousel-home').carousel();

});
