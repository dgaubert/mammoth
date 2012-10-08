$(document).ready(function() {
  $('ul.pagination li.pagination-icon').hover(
    function() { $(this).addClass('ui-state-hover'); }, 
	function() { $(this).removeClass('ui-state-hover'); }
  );
});
