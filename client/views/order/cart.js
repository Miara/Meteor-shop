Template.cart.helpers({
	positions : function(){
		return getOrderPositions();
	},
	sum: function(){
		return getOrderSum();
	},
	deliveryOptions : function(){
		return DeliveryOptions.find({});
	},
	paymentOptions : function(){
		return PaymentOptions.find({});
	}
});

Template.cart.events({
	'click .go-to-summary' : function(event){
		event.preventDefault();
		var payment = $('input[name=payment]:checked').val();
		var delivery = $('input[name=delivery]:checked').val();
		Orders.update({_id: getOrderId()},
			{$set:
				{
					'payment': payment,
					'delivery': delivery
				}
			});
		Router.go('orderSummary');
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
		if(value <= 0){
			value=1;
		}
		OrderPositions.update({_id: this._id},{$set: {amount: value}});
	}
}); 

Template.cartItem.helpers({
	totalPrice: function(){
		return this.price * this.amount;
	}
});