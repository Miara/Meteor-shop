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

Template.orderSummary.events({
	'click .confirm' : function(event){
		event.preventDefault();
		Orders.update(getOrder()._id, {
			$set: {
				name: 	Meteor.user().profile.name,
				surname: Meteor.user().profile.surname,
				city:   Meteor.user().profile.city,
				address: Meteor.user().profile.address,
				postcode: Meteor.user().profile.postcode,
				confirmed: true
			}
		});

		var orderId = Orders.insert({
	      	sum: 0,
	      	userId: Meteor.userId(),
	      	confirmed: false
	    });

		Router.go('confirm',{});
		
	}
});

Template.cartSummaryItem.helpers({
	totalPrice: function(){
		return this.price * this.amount;
	}
});