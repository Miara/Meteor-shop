Template.category.helpers({
	categoryProducts : function(){
		return Products.find({ 'categories' : this._id});
	}
});