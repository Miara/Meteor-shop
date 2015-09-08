Meteor.publish('products',function(){
	return Products.find({});
});

Meteor.publish('categories',function(){
	return Categories.find({});
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
