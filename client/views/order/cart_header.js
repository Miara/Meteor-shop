Template.cartHeader.helpers({
	productCount: function(){
		if(getOrderId){
			return OrderPositions.find({order: getOrderId()}).count();
		}
	}
});