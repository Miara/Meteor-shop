Attributes = new Meteor.Collection('attributes');

Attributes.allow({
  insert: isAdmin,
  update: isAdmin,
  remove: isAdmin
});