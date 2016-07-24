Template.productListItem.helpers({
	itemPath: function() {
	  var pathname = this.path;
      if (pathname.substring(0, 4) != "http") {
          pathname = "/" + pathname;
      }
      return pathname;
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