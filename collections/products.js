Products = new Meteor.Collection('products');


//TODO: dostosować uprawnienia
Products.allow({
  insert: isAdmin,
  update: isAdmin,
  remove: isAdmin
});