Template.productItem.helpers({
	itemPath: function() {
      var pathname = Session.get("imagePath");
      if (pathname.substring(0, 4) != "http") {
          pathname = "/" + pathname;
      }
      return pathname;
  	}
});

Template.productItem.events({
	'click .add-to-cart': function(event){
		event.preventDefault();
		addToCart(this);
	}
});

Template.productItemAttribute.helpers({
  getAttributeName: function(){
    var attribute = Attributes.findOne({_id: this.id});
    return attribute.name;
  }
});