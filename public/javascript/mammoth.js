$(document).ready(function() {
  
  $('input.date').datepicker({dateFormat: 'dd/mm/yy'});

  $('a#search').button({icons: {primary: "ui-icon-search"}});
  $('h3.tag1').button().addClass('link');;
  
  $('ul.pagination li.pagination-icon').hover(
    function() { $(this).addClass('ui-state-hover'); }, 
    function() { $(this).removeClass('ui-state-hover'); }
  );

});
