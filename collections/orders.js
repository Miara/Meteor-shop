Orders = new Meteor.Collection('orders');

Orders.allow({
  	update: function(){return true;},
  	remove: isAdmin
});


isOrderConfirmed = false;

getOrder = function(id){
	if(id !== undefined){
		return Orders.findOne(id);
	}

	if(Meteor.userId()){
		return Orders.findOne({ 
			userId: Meteor.userId(),
			confirmed: false
		});
	}else{
		return null;
	}
}

getOrderId = function(){
	var order = getOrder();
	if(!isEmpty(order)){
		return order._id;
	}else{
		return null;
	}
}

getOrderPositions = function(id){
	var mId = getOrderId();
	if(id !== undefined){
		mId = id;
	}
	return OrderPositions.find({order: mId}).map(function(pos,index){
			pos.index = index + 1;
			return pos;
		});
}

getOrderSum = function(id){
	var cursor = getOrderPositions(id);
	var  sum = 0;
	cursor.forEach(function(pos){
		sum = sum + pos.amount * pos.price;
	});
	return sum;
}

addToCart = function(product){
	var orderId = getOrderId();
	if(orderId){
		var position = OrderPositions.findOne({
			order: orderId, 
			product: product._id
		});
		if(position){
			OrderPositions.update({ _id: position._id},
				{$inc : {amount: 1}}
			);
		}else{
			OrderPositions.insert({
				order: orderId,
				product: product._id,
				name: product.name,
				price: product.price,
				imagePath: product.imagePath,
				amount: 1
			});
		}
	}else{
		console.log("orderId is empty");
	}
}



OrderPositions = new Meteor.Collection('orderPositions');

OrderPositions.allow({
  insert: function(){ return true;},
  update: function(){ return true;},
  remove: function(){ return true;}
});

DeliveryOptions = new Meteor.Collection('deliveryOptions');

DeliveryOptions.allow({
  insert: isAdmin,
  remove: isAdmin
});

PaymentOptions = new Meteor.Collection('paymentOptions');

PaymentOptions.allow({
  insert: isAdmin,
  remove: isAdmin
});



Meteor.methods({
  confirmOrder: function(data) {
    
    Orders.update(getOrder()._id, {
			$set: {
				email: 	Meteor.user().profile.email,
				name: 	Meteor.user().profile.name,
				surname: Meteor.user().profile.surname,
				city:   Meteor.user().profile.city,
				address: Meteor.user().profile.address,
				postcode: Meteor.user().profile.postcode,
				sum: getOrderSum(),
				confirmed: true,
				realized: false
			}
		});

		var orderId = Orders.insert({
	      	sum: 0,
	      	userId: Meteor.userId(),
	      	confirmed: false
	    });

	    Meteor.call('sendEmail',
	    	Meteor.user().profile.email, 
	    	'Confirmation with order ' + getOrder()._id ,
	    	'Your order was accepted, Thank you for buying in our shop.');

    return true;
  }
});