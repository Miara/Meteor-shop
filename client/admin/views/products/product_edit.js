Template.adminProductEdit.onCreated(function(){
    categoryId = new ReactiveVar(false);
});

Template.adminProductEdit.helpers({
    isImageAdded : function(){
      
      if(this._id === undefined){
        Session.set("imagePath","images/test.jpg");
        return true;
          if(Session.get("imagePath") === undefined ||
            Session.get("imagePath") === ""  ){
          return false;
        }else{
          return true;
        }
      }else{
        Session.set("imagePath",this.path);
        $('#form-product-name').val(this.name);
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
      return  Session.get("imagePath");
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
      
    }
});


Template.adminProductEdit.events({
  "click .close-product-image" : function(event){
    Session.set("imagePath","");
  },
  "click .add-product-button": function(event){
    event.preventDefault();

    var productCategories = getProductCategories();
    if(validate()){
      Products.insert({
        name: $('#form-product-name').val(),
        path:  Session.get("imagePath"),
        price: $("#form-product-price").val(),
        categories: productCategories 
      });
      Router.go("adminProductList");
    }else{
      return false;
    }
    
  },
  "click .product-apply-button": function(event){
    event.preventDefault();
    var productCategories = getProductCategories();
    if(validate()){
      Products.update(this._id, {
          $set: {
            name:  $('#form-product-name').val(),
            path:  Session.get("imagePath"),
            price: $("#form-product-price").val(),
            categories: productCategories 
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