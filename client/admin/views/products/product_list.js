Template.adminProductList.helpers({
	products: function() {
    	_searchDeps.depend();
		if(isEmpty(priceCriteria)){
			priceCriteria = { $exists: true };
		}
		if(this.search){
			var reg = ".*"+this.search+".*";
			return Products.find({
				"price": priceCriteria,
				"name" : {$regex: reg ,$options: "i"}
			},{sort: sortCriteria});
		}else{
			return Products.find({"price": priceCriteria},{sort: sortCriteria});
		} 
  }
});

Template.adminProductItem.helpers({
	imagePath: function(){
	  var pathname = this.path;
      if (pathname.substring(0, 4) != "http") {
          pathname = "/" + pathname;
      }
      return  pathname;
	}
});

Template.adminProductList.rendered = function(){
	height = $('#main').height();
	if($('.sidebar nav').height() < height){
		$('.sidebar nav').height(height);
	}
	
}