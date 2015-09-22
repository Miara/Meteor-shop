Orders = new Meteor.Collection('orders');

Orders.allow({
  update: function(){ return true;}
});

getOrder = function(){
	if(Meteor.userId()){
		return Meteor.user().profile.order;
	}else{
		return null;
	}
}

addToCart = function(product){
	var order = getOrder();
	if(order){
		var position = OrderPositions.findOne({
			order: order._id, 
			product: product._id
		});
		if(position){
			OrderPositions.update({ _id: position._id},
				{$inc : {amount: 1}}
			);
		}else{
			OrderPositions.insert({
				order: order._id,
				product: product._id,
				name: product.name,
				price: product.price,
				imagePath: product.imagePath,
				amount: 1
			});
		}
	}
}



OrderPositions = new Meteor.Collection('orderPositions');

OrderPositions.allow({
  insert: function(){ return true;},
  update: function(){ return true;},
  remove: function(){ return true;}
});