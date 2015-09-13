Template.adminProductEdit.helpers({
  isImageAdded : function(){
    if(this._id === undefined){
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
  }
});

Template.adminProductEdit.events({
  "click .close-product-image" : function(event){
    Session.set("imagePath","");
  },
  "click .add-product-button": function(event){
    event.preventDefault();

    
    if(validate()){
      Products.insert({
        name: $('#form-product-name').val(),
        path:  Session.get("imagePath"),
        price: $("#form-product-price").val()
      });
      Router.go("adminProductList");
      return;
    }
    
  },
  "click .product-apply-button": function(event){
    event.preventDefault();
    Products.update(this._id, {
        $set: {
          name:  $('#form-product-name').val(),
          path:  Session.get("imagePath"),
          price: $("#form-product-price").val()
        }
      });
    Router.go("adminProductList");
  },
  "click .product-remove-button": function(event){
    event.preventDefault();
    console.log("remove");
    Products.remove(this._id);
    Router.go("adminProductList");
  }
});

var validate = function(){
  clearErrors();
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