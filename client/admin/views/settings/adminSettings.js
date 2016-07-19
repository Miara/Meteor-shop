Template.adminSettings.helpers({
	payments: function(){
		return PaymentOptions.find({});
	},
	deliveries: function(){
		return DeliveryOptions.find({});
	}
});

Template.adminSettings.events({
	'click .settings-apply-button': function(){
		clearErrors();

		var data = {};
		data.email = $('#settings-email-name').val();
		data.password = $('#settings-email-pass').val();
		data.smtp = $('#settings-email-smtp').val();
		data.port = $('#settings-email-port').val();


		Meteor.call('changeSettings', data, function(error, result) {
              if (error){
                throwError(error.reason);
              }
        });
	}
})


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

Template.paymentOrDeliveryRowTemplate.helpers({
	displayCloseBtn: function(){
		if(this.payment && PaymentOptions.find().count() == 1){
			return false;
		}else if(!this.payment && DeliveryOptions.find().count() == 1){
			return false;
		}
		return true;
	}
});

Template.paymentOrDeliveryRowTemplate.events({
	'click .close': function(event){
		if(this.payment){
			if(PaymentOptions.find().count() > 1){
				PaymentOptions.remove({_id: this._id});
				var id = PaymentOptions.findOne()._id;
				PaymentOptions.update({_id: id},{$set: {checked: true}});
			}else{
				//TODO: service bug
			}
		}else{
			if(DeliveryOptions.find().count() > 1){
				DeliveryOptions.remove({_id: this._id});
				var id = DeliveryOptions.findOne()._id;
				DeliveryOptions.update({_id: id},{$set: {checked: true}});
			}else{
				//TODO: service bug
			}
		}
	}
});

function getNumber(n){
	if(isNaN(parseFloat(n)) && isFinite(n)){
		return 0;
	}else{
		return parseFloat(n);
	}
}
