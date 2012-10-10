$(document).ready(function() {
  
  $('input.date').datepicker();
  
  $('ul.pagination li.pagination-icon').hover(
    function() { $(this).addClass('ui-state-hover'); }, 
	function() { $(this).removeClass('ui-state-hover'); }
  );
});
