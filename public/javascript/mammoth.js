$(document).ready(function() {
  
  $('input').addClass('ui-corner-all');
  
  $('input.date').datepicker({dateFormat: 'dd/mm/yy'});

  $('a#search').button({
    icons: {
      primary: "ui-icon-search"
    }
  });
  
  $('a.link').button();
  
  $('a.tag').button();
  
  $('a#previous').button({
    text: false,
    icons: {
      primary: "ui-icon-carat-1-w"
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
      primary: "ui-icon-carat-1-e"
    }
  });
  
  $('div.paginator').buttonset();
  
  $('a#next').addClass('ui-corner-right');
  
  $('ul#pages').hide().menu();

});