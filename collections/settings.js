Settings = new Meteor.Collection('settings');


Categories.allow({
  update: isAdmin
});