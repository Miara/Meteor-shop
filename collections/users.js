Meteor.methods({
  register: function(data) {
    var username = data.username;
    var password = data.password;
    var password2 = data.password2;

    if(username.length < 5){
      throw new Meteor.Error(401, "Username must have at least 5 characters");
      return -1;
    }
    var user =  Meteor.users.find({username: username});
    // ensure the user is logged in
    if (user == undefined){
      throw new Meteor.Error(401, "This user already exists");
      return -1;
    }

    if(password.length < 5){
      throw new Meteor.Error(401, "Password must have at least 5 characters");
      return -1;
    }

    if (password != password2){
      throw new Meteor.Error(422, 'Passwords are not the same');
      return -1;
    }

    if(!verifyUserData(data)){
      return -1;
    }

    var id = Accounts.createUser({
      username: username, 
      password: password,
      profile: {
        isAdmin: false,
        order: orderId,
        email: data.email,
        name: data.name,
        surname: data.surname,
        city: data.city,
        address: data.address,
        postcode: data.postcode
      }});

    var orderId = Orders.insert({
      products: [],
      sum: 0,
      userId: id,
      confirmed: false
    });

    return id;
  },

  manageAccount: function(data) {
    
    if(!verifyUserData(data)){
      return -1;
    }

    Meteor.users.update(Meteor.userId(), {$set: {
      'profile.name': data.name,
      'profile.email': data.email,
      'profile.surname': data.surname,
      'profile.city': data.city,
      'profile.address': data.address,
      'profile.postcode': data.postcode
    }});

    return true;
  }
});

verifyUserData = function(data){

  console.log(data.email);

  var patt = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;

   if(isEmpty(data.email) || !patt.test(data.email)){
    throw new Meteor.Error(401, "Incorrect format of email");
    return false;
  }

   if(isEmpty(data.name)){
    throw new Meteor.Error(401, "Name cannot be empty");
    return false;
  }

   if(isEmpty(data.surname)){
    throw new Meteor.Error(401, "Surname cannot be empty");
    return false;
  }

  

   if(isEmpty(data.city)){
    throw new Meteor.Error(401, "City cannot be empty");
    return false;
  }

   if(isEmpty(data.address)){
    throw new Meteor.Error(401, "Address cannot be empty");
    return false;
  }

  patt = new RegExp("([0-9]{2}(-| )[0-9]{3})|[0-9]{5}");

  if(isEmpty(data.postcode) || !patt.test(data.postcode)){
    throw new Meteor.Error(401, "Postcode has to have format XX-XXX");
    return false;
  }

  return true;
}