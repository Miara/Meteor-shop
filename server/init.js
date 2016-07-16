Meteor.startup(function () {

  var settings = Settings.findOne();

  if (isEmpty(settings)){
    process.env.MAIL_URL="smtp://sklep.magisterka%40gmail.com:m%40g1st3rk%40@smtp.gmail.com:465/";
  }else{
    process.env.MAIL_URL = "smtp://" + settings.email + ":" +settings.password + "@" +
      settings.smtp + ":" + settings.port + "/";
  }
  console.log(process.env.MAIL_URL);
  

  UploadServer.init({
    tmpDir: process.env.PWD + '/public/tmp/',
    uploadDir: process.env.PWD + '/public',
    checkCreateDirectories: true,
    imageVersions: {
      large: {width: 600, height: 450, format: 'jpg'}, 
      medium: {width: 400, height: 300, format: 'jpg'},
      small: {width: 200, height: 100, format: 'jpg'}
    },
    getDirectory: function(file, formData) {
      return formData.contentType;
    },
    finished: function(file, folder, formFields) {
      console.log('Write to database: ' + folder + '/' + file);
    }
  })
});

Meteor.methods({
  throwPath: function(){
    throw new Meteor.Error(401, "process:"+ process.env.PWD);
  }
});


Meteor.methods({
  sendEmail: function (to, subject, text) {
    //check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      subject: subject,
      text: text
    });
  }
});