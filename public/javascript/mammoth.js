$(document).ready(function() {
  
  /*** Inputs ***/ 
  $('input').addClass('ui-corner-all');
  
  $('input.date').datepicker({
    dateFormat: 'dd/mm/yy',
    firstDay: 1
  });
  
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
    dateFormat: 'dd/mm/yy', firstDay: 0, 
    initStatus: '', isRTL: false};
  $.datepicker.setDefaults($.datepicker.regional['es']);
  
  /*** Links ***/
  $('a#search').button({
    icons: {
      primary: 'ui-icon-search'
    }
  });
  $('a.link').button();
  $('a.tag').button();
  
  /*** Paginator ***/
  $('a#previous').button({
    text: false,
    icons: {
      primary: 'ui-icon-carat-1-w'
    }
  });
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
  $('div.paginator').buttonset();
  $('a#next').addClass('ui-corner-right');
  $('ul#pages').hide().menu();
  
  /*** Filter ***/
  
  /* Titles */
  $.getJSON('/blog/titles', function(titles) {
    $('input#title').autocomplete({
      source: titles
    });
  });

  /* Tags */
  $.getJSON('/blog/tags', function(tags) {
    $('input#tag').autocomplete({
      source: tags
    });
  });
  
});
