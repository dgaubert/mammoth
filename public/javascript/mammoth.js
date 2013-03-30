$(document).ready(function() {

  /**
   * Inputs
   */
  $('input').addClass('ui-corner-all');
  $('textarea').addClass('ui-corner-all');

  /**
   * Pagination
   */
  $('a#previous').button({
    text: false,
    icons: {
      primary: 'ui-icon-carat-1-w'
    }
  });
  if ($('a#previous').hasClass('disable')) {
    $('a#previous').button('disable');
  }
  $('a#page-selector')
    .button()
    .click(function() {
      var menu = $('ul#pages').show().position({
          my: 'left top',
          at: 'left bottom',
          of: this
      });
      $(document).one('click', function() {
          menu.hide();
      });
      return false;
  });
  $('a#next').button({
    text: false,
    icons: {
      primary: 'ui-icon-carat-1-e'
    }
  });
  if ($('a#next').hasClass('disable')) {
    $('a#next').button('disable');
  }
  $('div.pagination').buttonset();
  $('a#next').addClass('ui-corner-right');
  $('ul#pages').hide().menu();
  $('ul#pages .ui-menu-item a.selected').addClass('ui-state-disabled');

  /**
   * Links
   */
  $('a#search').button({
    icons: {
      primary: 'ui-icon-search'
    }
  });
  $('a#mailto').button({
    icons: {
      primary: 'ui-icon-mail-closed'
    }
  });
  $('a.link, a.tag, a.category').button();

  /**
   * Clouds
   */
  if ($('#word-cloud').length > 0) {
    $.getJSON('/blog/word-cloud', function(words) {
        $('#word-cloud').jQCloud(words);
    });
  }

  /**
   * Comments
   */

  /* Form */
  $(document).ready(function(){
      $('textarea').autosize();
  });
  $('input#name').attr('placeholder', 'Nombre (requerido)');
  $('input#mail').attr('placeholder', 'Correo electronico (requerido)');
  $('textarea#comment').attr('placeholder', 'Escribe un comentario (requerido)');

  $('button#comment').button({
    icons: {
      primary: 'ui-icon-comment'
    }
  });

  $('body').bind('onload', function() {
    $("html, body").animate({scrollTop: $("#lastCommnent").scrollTop()}, 1000);
  });

  var checkComment = function() {
    var comment = $('form#comment').serializeArray(),
        tags = comment[2].value.match(/<(.*?)>/g),
        closed,
        tag,
        i,
        j;
    if (comment[0].value.match(/^[\w\s._-]+$/) === null) {
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

  /**
   * Admin
   */
  $('input.save, input.login').button().css('line-height','0.8');

});