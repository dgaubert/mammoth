$(document).ready(function() {
  
  /*** Inputs ***/
  $('input').addClass('ui-corner-all');
  $('textarea').addClass('ui-corner-all');
  
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

  /* Categories */
  $('select#category')
    .attr('data-placeholder', 'Busca por categoria')
    .chosen({
      no_results_text: 'Sin resultados',
      allow_single_deselect: true
    });

  /* Dates */
  $('input#start').attr('placeholder', 'Desde');
  $('input#end').attr('placeholder', 'Hasta');
  
  /* Tags */
  $('select#tag')
    .attr('data-placeholder', 'Busca por tags')
    .chosen({
      no_results_text: 'Sin resultados'
    });

  /*** Comments ***/
  
  /* Form */
  $('input#name').attr('placeholder', 'Nombre (requerido)');
  $('input#mail').attr('placeholder', 'Correo electronico (requerido)');
  $('textarea#comment').attr('placeholder', 'Escribe un comentario (requerido)');

  $('button#comment').button({
    icons: {
      primary: 'ui-icon-comment'
    }
  });

  /*
  $('a#comment').on('click', function () {
    var comment = $('form#comment').serializeArray();
    $.each(comment, function(i, obj) {
      switch (obj.name) {
        case 'name':
          alert(obj.value);
          break;
        case 'mail':
          alert(obj.value);
          break;
        case 'comment':
          alert(obj.value);
          break;    
      }
    });
  });
  */
});
