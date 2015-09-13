isAdmin = function() {
  return Meteor.user().profile.isAdmin;
}