$('.dropdown-menu').click(function(event) {
        event.stopPropagation();
    });

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
