Template.adminSettings.helpers({
	payments: function(){
		return PaymentOptions.find({});
	},
	deliveries: function(){
		return DeliveryOptions.find({});
	}
});


Template.paymentOrDeliveryAddTemplate.events({
	'click .add-value-button': function(event){
		if(this.payment){
			PaymentOptions.insert({
				name: $('#payment-new-name').val()
			});
		}else{
			DeliveryOptions.insert({
				name: $('#delivery-new-name').val(),
				price: getNumber($('#delivery-new-price').val())

			});
		}
	}
});

Template.paymentOrDeliveryRowTemplate.events({
	'click .close': function(event){
		if(this.payment){
			if(PaymentOptions.find().count() > 1){
				PaymentOptions.remove({_id: this._id});
			}else{
				//TODO: service bug
			}
		}else{
			if(DeliveryOptions.find().count() > 1){
				DeliveryOptions.remove({_id: this._id});
			}else{
				//TODO: service bug
			}
		}
	}
});