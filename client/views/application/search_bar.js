Template.searchBar.helpers({
	searchValue: function() {
		return this.search;
	}
});

Template.searchBar.events({
	'click #search-field-click': function(event){
		if(Router.current().route.getName() === "adminProductList"){
			Router.go('/admin/products?search='+ $("input[name='search']").val());
		}else{
			Router.go('/main?search='+ $("input[name='search']").val());
		}

	}

});