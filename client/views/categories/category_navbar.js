Template.categoryNavbar.helpers({
	mainCategories:  function() {
    return Categories.find({'mainCategory' : true});
  }
});