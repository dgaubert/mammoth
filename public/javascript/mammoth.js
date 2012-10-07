$(document).ready(function() {
  $('ul#pagination li:not(.pagination-info)').hover(
    function() { $(this).addClass('ui-state-hover'); }, 
	function() { $(this).removeClass('ui-state-hover'); }
  );
});
