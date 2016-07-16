Template.adminSettings.helpers({
	payments: function(){
		return PaymentOptions.find({});
	},
	deliveries: function(){
		return DeliveryOptions.find({});
	}
});