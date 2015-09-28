Template.adminAttributeList.helpers({
	attributes: function(){
		return Attributes.find({ "adding" : { "$exists" : false } });
	}
});