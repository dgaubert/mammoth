$(document).ready(function() {
  
  /*** Inputs ***/ 
  $('input').addClass('ui-corner-all');
  
  $('input.date').datepicker();
  
  /*** Location ***/
  $.datepicker.regional['es'] = {clearText: 'Limpiar', clearStatus: '',
    closeText: 'Cerrar', closeStatus: '',
    prevText: '&lt;Ant', prevStatus: '',
    nextText: 'Sig&gt;', nextStatus: '',
    currentText: 'Hoy', currentStatus: '',
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
    'Jul','Ago','Sep','Oct','Nov','Dic'],
    monthStatus: '', yearStatus: '',
    weekHeader: 'Sm', weekStatus: '',
    dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;dabo'],
    dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
    dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
    dayStatus: 'DD', dateStatus: 'D, M d',
    dateFormat: 'dd/mm/yy', firstDay: 1, 
    initStatus: '', isRTL: false};
  $.datepicker.setDefaults($.datepicker.regional['es']);

  /*** Pagination ***/
  $('a#previous').button({
    text: false,
    icons: {
      primary: 'ui-icon-carat-1-w'
    }
  });
  if($('a#previous').hasClass('disable')) {
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
  if($('a#next').hasClass('disable')) {
    $('a#next').button('disable');
  }
  $('div.pagination').buttonset();
  $('a#next').addClass('ui-corner-right');
  $('ul#pages').hide().menu();

  
  /*** Links ***/
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
  
  /*** Filter ***/
  
  /* Titles */
  $('select#title')
      .attr('data-placeholder', 'Busca por titulo')
      .chosen({
        no_results_text: 'Sin resultados',
        allow_single_deselect: true
      });
  /*
  $.getJSON('/blog/filter/titles', function(titles, status) {
    $.each(titles, function(i, title) {
      if ( i == 0 )
        $('select#title').append($('<option></option>'));
      $('select#title')
         .append($('<option></option>')
         .attr('value',title)
         .text(title));
    });
    $('select#title')
      .attr('data-placeholder', 'Busca por titulo')
      .chosen({
        no_results_text: 'Sin resultados',
        allow_single_deselect: true
      });
  });
  */
  /* Categories */

  $('select#category')
    .attr('data-placeholder', 'Busca por categoria')
    .chosen({
      no_results_text: 'Sin resultados',
      allow_single_deselect: true
    });

   /*
  $.getJSON('/blog/filter/categories', function(categories) {
    $.each(categories, function(i, category) {
      if ( i == 0 )
        $('select#category').append($('<option></option>'));
      $('select#category')
         .append($('<option></option>')
         .attr('value',category)
         .text(category));
    });
    $('select#category')
      .attr('data-placeholder', 'Busca por categoria')
      .chosen({
        no_results_text: 'Sin resultados',
        allow_single_deselect: true
      })
    ;
  });
  */

  /* Dates */
  $('input#start').attr('placeholder', 'Desde');
  $('input#end').attr('placeholder', 'Hasta');
  
  /* Tags */

  $('select#tag')
    .attr('data-placeholder', 'Busca por tags')
    .chosen({
      no_results_text: 'Sin resultados'
    });

  /*
  $.getJSON('/blog/filter/tags', function(tags) {
    $.each(tags, function(i, tag) {
      if ( i == 0 )
        $('select#tag').append($('<option></option>'));
      $('select#tag')
         .append($('<option></option>')
         .attr('value',tag)
         .text(tag));
    });
    $('select#tag')
      .attr('data-placeholder', 'Busca por tags')
      .chosen({
        no_results_text: 'Sin resultados'
      })
    ;
  });
  */
});
