Template.adminOrderList.helpers({
	orders: function() {
    return Orders.find({confirmed: true}).map(function(pos,index){
			pos.index = index + 1;
			return pos;
		});;
  }
});