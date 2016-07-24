Template.adminProductEdit.onCreated(function(){
    categoryId = new ReactiveVar(false);
    this.currentUpload = new ReactiveVar(false);
    Session.set("imagePath", undefined);
});

Template.adminProductEdit.helpers({
    currentUpload: function () {
      return Template.instance().currentUpload.get();
    },
    isImageAdded : function(){
       if(Session.get("imagePath") === undefined){
          if(this._id === undefined){
            return false;
          }else{
            if(this.path !== undefined && this.path !== ""){
              Session.set("imagePath", this.path);
              return true;
            }else{
              return false;
            }
          }

       }else if(Session.get("imagePath") === ""){
          return false;
       }else{
          return true;
       }

      
    },
    isEditedItem : function(){
       if(this._id === undefined){
        return false;
      }else{
        return true;
      }
    },
    imagePath : function(){
      var pathname = Session.get("imagePath");
      if (pathname.substring(0, 4) != "http") {
          pathname = "/" + pathname;
      }
      return  pathname;
    },
  	fileUploadedCallback: function() {
      return {
          finished: function(index, fileInfo, context) { 
            console.log(fileInfo);
            Session.set("imagePath","images/"+fileInfo.name);
          }
      }
    },
    currentCategory: function(){
      if(categoryId.get()){
        return Categories.findOne(categoryId.get());
      }
      if(this._id === undefined){
          var category = Categories.findOne({categoryLevel : 0});
          categoryId.set(category._id);
          return category;
      }else{
          var maxLevel = -1;
          var choosen = null;
          for(var i = 0; i < this.categories.length; i++){
              var cat = Categories.findOne(this.categories[i]);
              if(cat.categoryLevel > maxLevel){
                  maxLevel = cat.categoryLevel;
                  choosen=cat;
              }      
          }
          categoryId.set(choosen._id);
          return choosen;
      }
      
    },
    selectedAttributes: function(){
      //TODO refaktoryzacja
      var attributes = [];
      for(var i=0; i< this.attributes.length ; i++){
          var attr = Attributes.findOne({_id: this.attributes[i].id});
          attr.value = this.attributes[i].value;
          attributes.push(attr);
      }
        console.log(attributes);
      return attributes;
    },
    unselectedAttributes: function(){
      var idArr = [];
      for(var i=0; i< this.attributes.length ; i++){
          idArr.push(this.attributes[i].id);
      }
      var cat = Categories.findOne(categoryId.get());
      return Attributes.find({ 
        $and: 
        [
          {_id:{$not: {$in: idArr}}},
          {_id: {$in: cat.attributes}},
          { "adding" : { "$exists" : false } }
        ]
      });
    }
});


Template.adminProductEdit.events({
  "click .close-product-image" : function(event){
    Session.set("imagePath","");
  },
  "click .add-product-button": function(event){
    event.preventDefault();

    var productCategories = getProductCategories();
    var productAttributes = getproductAttributes(this.attributes);
    if(validate()){
      Products.insert({
        name: $('#form-product-name').val(),
        path:  Session.get("imagePath"),
        price: $("#form-product-price").val(),
        categories: productCategories ,
        attributes: productAttributes
      });
      Router.go("adminProductList");
    }else{
      return false;
    }
    
  },
  "click .product-apply-button": function(event){
    event.preventDefault();
    var productCategories = getProductCategories();
    var productAttributes = getproductAttributes(this.attributes);
    if(validate()){
      Products.update(this._id, {
          $set: {
            name:  $('#form-product-name').val(),
            path:  Session.get("imagePath"),
            price: $("#form-product-price").val(),
            categories: productCategories ,
            attributes: productAttributes
          }
        });
    }
    Router.go("adminProductList");
    return false;
  },
  "click .product-remove-button": function(event){
    event.preventDefault();
    console.log("remove");
    Products.remove(this._id);
    Router.go("adminProductList");
    return false;
  },
  "click .add-attribute-button": function(event){
    var attrId = $('#attribute').val();
    var data = {id: attrId, value: ""}
    Products.update({ _id: this._id },{ $push: { attributes: data }});
    //TODO :DLA WSZYSTKICH KATEGORII PDORZĘDNYCH TEŻ
  },
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // multiple files were selected
      var upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          throwError('Error during upload: ' + error);
        } else {
          Session.set("imagePath", Images.findOne(fileObj._id).link());
          console.log(Images.findOne(fileObj._id).link());
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});

Template.adminProductAttribute.helpers({
  isTypeOf :  function(value){
      return this.type == value;
  },
  isChecked: function(){
    var attribute = Template.parentData();
    if(attribute.type == 'single'){
      if(attribute.value == this.valueOf())
        return true;
    }else if(attribute.type == 'multi'){
      if(attribute.value.indexOf(this.valueOf()) > -1)
        return true;
    }
    return false;  
  }
});

Template.adminProductAttribute.events({
  "click .remove-attribute-button" : function(){
    var prodId = Template.parentData()._id;
    Products.update({_id : prodId},{
      $pull: {attributes: {  id: this._id} }})
  }
});



var validate = function(){
  clearAllErrors();
    if(Session.get("imagePath") == "" ||
        Session.get("imagePath") === undefined){
      throwError("Please, upload image for product");
      return false;
    }
    if($('#form-product-name').val() === ""){
      throwError("Product must have name");
      return false;
    }
    if($("#form-product-price").val() === ""){
      throwError("Product must have price");
      return false;
    }

    return true;
}

var getProductCategories = function(){
    var array= [];
    var category = Categories.findOne(categoryId.get());
    array.unshift(category._id);
    while(category.categoryLevel > 0){
      category = Categories.findOne({subCategories: category._id});
      array.unshift(category._id);
    }
    return array;


}

var getproductAttributes = function(attributes){
  var result = [];
  for(var i=0; i<attributes.length ; i++){
    var attr = Attributes.findOne({_id : attributes[i].id});
    if(attr.type == 'multi'){
      var fields = $('input[name='+attr._id+']:checked');
      var values = [];
      for(var i=0; fields[i] ; i++){
        values.push(fields[i].value);
      }
      result.push({
        id: attr._id,
        value: values
      });
    }else{
      if(attr.type == 'single')
        var val = $('input[name='+attr._id+']:checked').val();
      else
        var val = $('input[name='+attr._id+']').val();
      result.push({
        id: attr._id,
        value: val
      });
    }
  }
  console.log(result);
  return result;
}