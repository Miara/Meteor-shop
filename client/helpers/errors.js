Errors = new Meteor.Collection(null);

throwError = function(message) {
  Errors.insert({message: message, seen: false})
}

clearErrors = function() {
  Errors.remove({seen: true});
}

Template.error.rendered = function() {
  var error = this.data;
  Meteor.defer(function() {
    Errors.update(error._id, {$set: {seen: true}});
  });
};