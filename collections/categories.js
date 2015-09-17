Categories = new Meteor.Collection('categories');


Categories.allow({
  insert: isAdmin,
  update: isAdmin,
  remove: isAdmin
});