Template.productItem.helpers({
	itemPath: function() {
      if( Router.current().route.getName() == "category"){
      	return "../" + this.path;
      }else{
      	return this.path;
      }
  	}
});

Template.productItem.events({
	'click .add-to-cart': function(event){
		event.preventDefault();
		addToCart(this);
	}
});