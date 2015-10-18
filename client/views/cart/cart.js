Template.cart.helpers({
	positions : function(){
		return OrderPositions.find({order: getOrder._id}).map(function(pos,index){
			pos.index = index + 1;
			return pos;
		});
	}
});

Template.cartItem.events({
	'click .remove-item' : function(event){
		event.preventDefault();
		OrderPositions.remove(this._id);
	},
	'click .product-link': function(event){
		event.preventDefault();
		Router.go('productItem',{_id : this.product});
		return false;
	},
	'click .recount': function(event){
		var value = $('input[name='+this._id+']').val();
		OrderPositions.update({_id: this._id},{$set: {amount: value}});
	}
});