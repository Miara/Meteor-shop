Template.productListItem.helpers({
	itemPath: function() {
      if( Router.current().route.getName() == "category"){
      	return "../" + this.path;
      }else{
      	return this.path;
      }
  	}
});