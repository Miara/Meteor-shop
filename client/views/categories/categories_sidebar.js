	Template.categoriesSidebar.helpers({
		mainCategories:  function() {
	    return Categories.find({'categoryLevel' : this.level});
	  }
	});

	Template.categoriesSidebarItem.helpers({
		subCats : function(){
			return Categories.find({_id:{$in: this.data.subCategories}});
		}
	});

	Template.categoriesSidebarItem.events({
		'click a' : function(event){
			if(this.redirect == true){
				Router.go('category',{_id : this.data._id});
				return false;
			}else{
				//categoryId is ReactiveVar used in another template
				categoryId.set(this.data._id);	
			}
		}
	})
