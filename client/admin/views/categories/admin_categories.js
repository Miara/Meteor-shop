Template.adminCategories.helpers({
	currentCategory: function(){
		if(categoryId.get()){
			return Categories.findOne(categoryId.get());
		}else{
			return Categories.findOne({categoryLevel: 0})
		}
	}
});

Template.adminCategories.onCreated(function(){
	categoryId = new ReactiveVar(false);
});


Template.adminCategoriesItem.helpers({
	subCats : function(){
		return Categories.find({_id:{$in: this.subCategories}});
	},
	selectedAttributes: function(){
		return Attributes.find({ 
			$and: 
			[
				{_id:{$in: this.attributes}},
				{ "adding" : { "$exists" : false } }
			]
		});
	},
	unselectedAttributes: function(){
		return Attributes.find({ 
			$and: 
			[
				{_id:{$not: {$in: this.attributes}}},
				{ "adding" : { "$exists" : false } }
			]
		});
	}
});

Template.adminCategoriesItem.events({
	"click .add-subcategory-button" : function(event){
		event.preventDefault();

		if($('#subcategory-name').val() === ""){
	      throwError("Subcategory must have name");
	      return false;
	    }

	    var id = Categories.insert({
	    	name : $('#subcategory-name').val(),
	    	categoryLevel : this.categoryLevel +1,
	    	subCategories : []
	    });

	    Categories.update({ _id: this._id },{ $push: { subCategories: id }})
	    $('#subcategory-name').val("");

	},
	"click .add-attribute-button": function(event){
		var attr = $('#attribute').val();
		Categories.update({ _id: this._id },{ $push: { attributes: attr }});
		//TODO :DLA WSZYSTKICH KATEGORII PDORZĘDNYCH TEŻ
	},
	"click .category-apply-button" : function(event){
		event.preventDefault();

		if($('#category-name').val() === ""){
	      throwError("Category must have name");
	      return false;
	    }
	    Categories.update({_id: this._id},{$set :{name : $('#category-name').val()}})
	},
	"click .category-remove-button" : function(event){
		event.preventDefault();

		if(this.subCategories.length > 0){
			throwError("You must first remove subcategories");
			return false;
		}
		var parent = Categories.findOne({subCategories : {$in :[this._id]}});
		Categories.remove(this._id);
		categoryId.set(parent._id);
	}


});

Template.adminCategoryAttribute.events({
	'click .close': function(event){
		Categories.update({_id: this.catId},{$pull: {attributes: this.attr._id}});
		//TODO : DLA WSZYSTKICH KATEGORII PDORZĘDNYCH TEŻ
	}
});
