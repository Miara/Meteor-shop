Template.productListItem.helpers({
	itemPath: function() {
		return "/" + this.path;
      /*if( Router.current().route.getName() == "category"){
      	return "/" + this.path;
      }else{
      	return this.path;
      }*/
  	}
});

Template.productListItem.events({
	'click img': function(event){
		event.preventDefault();
		Router.go('productItem',{_id: this._id});
		return false;
	},
	'click .add-to-cart': function(event){
		event.preventDefault();
		addToCart(this);
		
	}
});