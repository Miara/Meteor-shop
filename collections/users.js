Meteor.methods({
  register: function(userData) {
    var username = userData.username;
    var password = userData.password;
    var password2 = userData.password2;

    if(username.length < 5){
      throw new Meteor.Error(401, "Username must have at least 5 characters")
    }
    var user =  Meteor.users.find({username: username});
    // ensure the user is logged in
    if (user == undefined)
      throw new Meteor.Error(401, "This user already exists");
    if (password != password2)
      throw new Meteor.Error(422, 'Passwords are not the same');

    var id = Accounts.createUser({
      username: username, 
      password: password,
      profile: {
        isAdmin: false
      }});

    return id;
  }
});