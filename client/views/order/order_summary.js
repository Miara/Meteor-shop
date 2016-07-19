Template.orderSummary.helpers({
	positions : function(){
		return getOrderPositions();
	},
	sum: function(){
		return getOrderSum();
	},
	delivery: function(){
		console.log(getOrder());
		var id = getOrder().delivery;
		console.log("payment:"+id);
		return DeliveryOptions.findOne(id);
	},
	payment: function(){
		var id = getOrder().payment;
		console.log("payment:"+id);
		console.log(this);
		return PaymentOptions.findOne(id);
	}

});

Template.confirm.rendered = function(){
  isOrderConfirmed = false;
};

Template.orderSummary.rendered = function(){
  isOrderConfirmed = false;
};

Template.orderSummary.events({
	'click .confirm' : function(event){
		event.preventDefault();
		Meteor.call('confirmOrder');
	    isOrderConfirmed = true;

		Router.go('confirm',{});
		
	}
});

Template.cartSummaryItem.helpers({
	totalPrice: function(){
		return this.price * this.amount;
	}
});