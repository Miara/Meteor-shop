_searchDeps = new Deps.Dependency;
priceCriteria = { $exists: true };
sortCriteria = {};

Template.mainPage.helpers({
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