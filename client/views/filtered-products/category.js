_searchDeps = new Deps.Dependency;
priceCriteria = { $exists: true };
sortCriteria = {};

Template.category.helpers({
	categoryProducts : function(){
		_searchDeps.depend();
		if(isEmpty(priceCriteria)){
			priceCriteria = { $exists: true };
		}
		if(this.search){
				var reg = ".*"+this.search+".*";
				return Products.find({
					"price": priceCriteria,
					'categories' : this.category._id, 
					"name" : {$regex: reg,$options: "i"}},{sort: sortCriteria});
		}
		return Products.find({
			"price": priceCriteria,
		 	'categories' : this.category._id},{sort: sortCriteria});
			
	}
});


