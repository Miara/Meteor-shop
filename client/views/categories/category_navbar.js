Template.categoryNavbar.helpers({
	mainCategories:  function() {
    return Categories.find({'categoryLevel' : 1});
  }
});


Template.categoryNavbarItem.helpers({
	activeCategoryClass: function() {
		var catId = Router.current().params._id;
      if( catId === this._id ||
      		this.subCategories.indexOf(catId) > -1){
      	return 'active';
      }
  	}
});