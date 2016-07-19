Settings = new Meteor.Collection('settings');


Categories.allow({
  update: isAdmin
});



Meteor.methods({
  changeSettings: function(data) {
    
    if(!verifySettingsData(data)){
      return -1;
    }

    var id = Settings.findOne()._id;
    Settings.update(id, {$set: {
      'profile.email': data.email,
      'profile.password': data.password,
      'profile.smtp': data.smtp,
      'profile.port': data.port
    }});

    process.env.MAIL_URL = "smtp://" + data.email + ":" +data.password + "@" +
      data.smtp + ":" + data.port + "/";

    return true;
  }
});


verifySettingsData = function(data){

  console.log(data.email);

  var patt = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;

   if(isEmpty(data.email) || !patt.test(data.email)){
    throw new Meteor.Error(401, "Incorrect format of email");
    return false;
  }

   if(isEmpty(data.password)){
    throw new Meteor.Error(401, "Password cannot be empty");
    return false;
  }

   if(isEmpty(data.smtp)){
    throw new Meteor.Error(401, "Smtp server cannot be empty");
    return false;
  }

  

   if(isEmpty(data.port) && !isNumber(data.port)){
    throw new Meteor.Error(401, "Port must be number");
    return false;
  }

  return true;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}