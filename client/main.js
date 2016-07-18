$('.dropdown-menu').click(function(event) {
        event.stopPropagation();
    });

$('.pull-down').each(function() {
	/*var outerHeight = 0;
	$('.profile').each(function() {
	  outerHeight += $(this).outerHeight();
	});*/
    $(this).css('margin-top', $(this).parent().height()-$(this).height()-$(this).prev().height());
});

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getNumber(n){
	if(isNaN(parseFloat(n)) && isFinite(n)){
		return 0;
	}else{
		return parseFloat(n);
	}
}

isOrderConfirmed = false;
