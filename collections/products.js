Products = new Meteor.Collection('products');


//TODO: dostosować uprawnienia
Products.allow({
  update: isAdmin,
  remove: isAdmin
});