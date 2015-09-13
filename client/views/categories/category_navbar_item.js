Template.categoryNavbarItem.helpers({
	activeCategoryClass: function() {
      if( Router.current().params._id === this._id){
      	return 'active';
      }
  }
});