Template.adminAttributeEdit.onCreated(function(){
	typeSelected = new ReactiveVar(this.type);
});

Template.adminAttributeEdit.helpers({
	activeHidden: function(value){
		if(this.hidden)
			return this.hidden == value;
		else
			return false == value;
	},
	activeType: function(value) {
		return this.type == value;
  	},
  	isTypeOf: function(){
		var args = Array.prototype.slice.call(arguments, 0);
	    args.pop();
	    var type = typeSelected.get();
	    if(!type)
	    	type = this.type;

	    var result = _.any(args, function(name) {	    	
	      	return type == name
	    });

	    return result;
	}
});

Template.adminAttributeEdit.events({
	"change #form-attribute-type" : function(event){
		var value = $(event.target).val();
		typeSelected.set(value);
	},
	'click .add-value-button': function(event){
		console.log(this.values);
		Attributes.update({_id: this._id},{$push: {values: $('#attr-new-value').val()}});

	},
    "click .add-attribute-button": function(event){
    	event.preventDefault();
	    if(validateAttributes()){
	    	data = getAttributeData();
	    	console.log(data);
		    Attributes.insert(data);
		    Attributes.update({_id : this._id},{$set: {values: []}});
		    Router.go("adminAttributeList");
	    }else{
	      return false;
	    }  
    },
    "click .attribute-apply-button": function(event){
	    event.preventDefault();
	    if(validateAttributes()){
	    	data = getAttributeData();
	        Attributes.update(this._id, {$set: data});
	    }
	    Router.go("adminAttributeList");
	    return false;
    },
    "click .attribute-remove-button": function(event){
	    event.preventDefault();
	    Attributes.remove(this._id);
	    Router.go("adminAttributeList");
	    return false;
  }
});


Template.adminAttributeValue.events({
	"click .close": function(event){
	Attributes.update({_id: this._id},{$pull: {values: this.value}});

	}
});

var validateAttributes = function(){
	var type = $('#form-attribute-type').val();
	if($('#form-attribute-name').val() === ""){
		throwError('Attribute must have name');
		return false;
	}

	if(type == 'numeric'){
		if($('#form-attribute-min').val() > $('#form-attribute-max').val()){
			throwError('min value cannot be greater than max');
			return false;
		}
	}else if(type == 'single' || type == 'multi'){


	}else if(type != 'text'){
		throwError("Type must be one of [numeric,text,single,multi]");
		return false;
	}
	return true;
}

var getAttributeData = function(){
	var type = $('#form-attribute-type').val();
	var hidden = $('input[name="hidden"]:checked').val();
	var data = {};
	data.name = $('#form-attribute-name').val();
	data.type = type;
	if(hidden == 'true')
		data.hidden = true;
	else
		data.hidden = false;

	if(type == 'numeric'){
		data.min = $('#form-attribute-min').val();
		data.max = $('#form-attribute-max').val();
		data.unit = $('#form-attribute-unit').val();
		data.defaultValue = $('#form-attribute-default').val();
		data.values = [];
	}else if(type == 'text'){
		data.values = [];
	}else if(type == 'single' ||  type == 'multi'){
		var current = Attributes.findOne({adding: true});
		data.values = current.values
	}

	return data;
}
