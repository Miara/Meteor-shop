Template.cartHeader.helpers({
	productCount: function(){
		return OrderPositions.find({order: getOrder()._id}).count();
	}
});