Template.adminOrderEdit.helpers({
	positions : function(){
		return getOrderPositions(this._id);
	},
	sum: function(){
		return getOrderSum(this._id);
	},
	delivery: function(){
		var id = getOrder(this._id).delivery;
		return DeliveryOptions.findOne(id);
	},
	payment: function(){
		console.log(getOrder(this._id));
		var id = getOrder(this._id).payment;
		return PaymentOptions.findOne(id);
	}
});

Template.adminEditOrderItem.helpers({
	totalPrice: function(){
		return this.price * this.amount;
	}
});

Template.adminOrderEdit.events({
	'click .order-apply-button': function(event){
		Orders.update({_id: this._id},{$set: 
			{
				name: $('#form-attribute-name').val(),
				surname: $('#form-attribute-surname').val(),
				city: $('#form-attribute-city').val(),
				address: $('#form-attribute-address').val(),
				postcode: $('#form-attribute-postcode').val(),
				realized: $('#form-order-realized').val()
			}
		});
		Router.go("adminOrderList");
	    return false;
	},
	'click .order-remove-button': function(event){
		Orders.remove(this._id);
	    Router.go("adminOrderList");
	    return false;
	}
});