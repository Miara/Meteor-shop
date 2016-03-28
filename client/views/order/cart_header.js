Template.cartHeader.helpers({
	productCount: function(){
		return OrderPositions.find({order: getOrderId()._id}).count();
	}
});