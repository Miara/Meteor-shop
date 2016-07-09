Meteor.publish('products',function(selection,other){
	return Products.find(selection,other);
});

Meteor.publish('categories',function(){
	return Categories.find({});
});

Meteor.publish('orders',function(){
  return Orders.find({});
});

Meteor.publish('orderPositions',function(){
  return OrderPositions.find({});
});

Meteor.publish('attributes',function(){
  return Attributes.find({});
});

Meteor.publish('deliveryOptions',function(){
  return DeliveryOptions.find({});
});

Meteor.publish('paymentOptions',function(){
  return PaymentOptions.find({});
});

Meteor.publish('userData', function() {
  if(!this.userId) return null;
  return Meteor.users.find(this.userId, {fields: {
    isAdmin: 1
  }});
});

Meteor.publish('adminCategories', function() {
  if(!this.userId) return null;
  return Meteor.users.find(this.userId, {fields: {
    isAdmin: 1
  }});
});
