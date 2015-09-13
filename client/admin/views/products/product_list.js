Template.adminProductList.helpers({
	products: function() {
    return Products.find({});
  }
});

Template.adminProductList.rendered = function(){
	height = $('#main').height();
	if($('.sidebar nav').height() < height){
		$('.sidebar nav').height(height);
	}
	
}